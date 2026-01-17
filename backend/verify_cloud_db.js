import mysql from 'mysql2/promise';

const destConfig = {
    host: process.env.CLOUD_DB_HOST,
    user: process.env.CLOUD_DB_USER,
    password: process.env.CLOUD_DB_PASSWORD,
    port: process.env.CLOUD_DB_PORT,
    database: 'sakila', // Assuming 'sakila' was created
    ssl: {
        rejectUnauthorized: false
    }
};

async function verify() {
    try {
        console.log('Connecting to Cloud DB...');
        const pool = mysql.createPool(destConfig);

        const [rows] = await pool.query('SELECT COUNT(*) as count FROM film');
        console.log('Film count:', rows[0].count);

        const [stores] = await pool.query('SELECT * FROM store');
        console.log('Stores:', stores.length);

        console.log('Cloud DB verification successful!');
        process.exit(0);
    } catch (e) {
        console.error('Verification failed:', e.message);
        // Try defaultdb if sakila missing
        if (e.code === 'ER_BAD_DB_ERROR') {
            console.log('Sakila DB not found, checking defaultdb...');
            // Logic to check defaultdb could be added here, but let's just fail for now.
        }
        process.exit(1);
    }
}

verify();
