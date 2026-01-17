import { pool } from './src/db.js';

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Database connection successful:', rows[0].result === 2);

        // Test a real table
        const [films] = await pool.query('SELECT title FROM film LIMIT 1');
        console.log('Film table accessible. First film:', films[0].title);

        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();
