import mysql from 'mysql2/promise';
import fs from 'fs';

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('migration.log', msg + '\n');
};

const sourceConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'sakila',
    port: 3306
};

const destConfig = {
    host: process.env.CLOUD_DB_HOST,
    user: process.env.CLOUD_DB_USER,
    password: process.env.CLOUD_DB_PASSWORD,
    port: process.env.CLOUD_DB_PORT,
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false }
};

async function migrate() {
    log('Starting migration...');
    const sourcePool = mysql.createPool(sourceConfig);
    const destPool = mysql.createPool(destConfig);

    try {
        log('Connected to source. Connecting to dest...');
        // Just use defaultdb
        await destPool.query('USE defaultdb');
        log('Using defaultdb on destination.');

        // 2. Disable FK Checks on Dest
        await destPool.query('SET FOREIGN_KEY_CHECKS=0');

        // 3. Get Tables from Source
        const [tables] = await sourcePool.query('SHOW FULL TABLES WHERE Table_type = "BASE TABLE"');
        log(`Found ${tables.length} tables to migrate.`);

        for (const row of tables) {
            const tableName = Object.values(row)[0];
            log(`Migrating table: ${tableName}...`);

            // 4. Get Schema
            const [createRows] = await sourcePool.query(`SHOW CREATE TABLE \`${tableName}\``);
            const createSql = createRows[0]['Create Table'];

            // Fix Schema: Ensure it doesn't force specific engine/collation if incompatible, 
            // but usually Aiven MySQL is compatible.
            // Run Create
            await destPool.query(`DROP TABLE IF EXISTS \`${tableName}\``);
            await destPool.query(createSql);

            // 5. Get Data
            const [rows] = await sourcePool.query(`SELECT * FROM \`${tableName}\``);
            if (rows.length > 0) {
                log(`  Inserting ${rows.length} rows...`);
                // Split into chunks to avoid packet size issues
                const chunkSize = 500; // Smaller chunk
                for (let i = 0; i < rows.length; i += chunkSize) {
                    const chunk = rows.slice(i, i + chunkSize);
                    const values = chunk.map(obj => Object.values(obj));
                    const placeholders = chunk.map(() => '(' + new Array(Object.values(chunk[0]).length).fill('?').join(', ') + ')').join(', ');
                    const flatValues = values.flat();

                    const insertSql = `INSERT INTO \`${tableName}\` VALUES ${placeholders}`;
                    await destPool.query(insertSql, flatValues);
                }
            } else {
                log('  Table is empty.');
            }
        }

        // 6. Migrating Views (Optional, Sakila has views)
        try {
            const [views] = await sourcePool.query('SHOW FULL TABLES WHERE Table_type = "VIEW"');
            log(`Found ${views.length} views.`);
            for (const row of views) {
                const viewName = Object.values(row)[0];
                // Views are tricky because they depend on tables. 
                // We do a simple try-best effort or just skip. 
                // Sakila views are "customer_list", "film_list", etc.
                // SHOW CREATE VIEW works.
                // MySQL SHOW CREATE VIEW returns "Create View" column
                // But sometimes it has DEFINER user which might not exist on cloud.
                // We need to strip DEFINER.
                const [createRows] = await sourcePool.query(`SHOW CREATE VIEW \`${viewName}\``);
                let createSql = createRows[0]['Create View'];
                createSql = createSql.replace(/DEFINER=`[^`]+`@`[^`]+`/, 'DEFINER=CURRENT_USER'); // Remove Definer
                await destPool.query(`DROP VIEW IF EXISTS \`${viewName}\``);
                await destPool.query(createSql);
            }
        } catch (e) {
            log('View migration error (non-fatal): ' + e.message);
        }

        // 7. Enable FK Checks
        await destPool.query('SET FOREIGN_KEY_CHECKS=1');
        log('Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        log('Migration failed: ' + err.message);
        console.error(err);
        process.exit(1);
    } finally {
        await sourcePool.end();
        await destPool.end();
    }
}

migrate();
