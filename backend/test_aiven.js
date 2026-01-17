import mysql from 'mysql2/promise';

const destConfig = {
    host: process.env.CLOUD_DB_HOST,
    user: process.env.CLOUD_DB_USER,
    password: process.env.CLOUD_DB_PASSWORD,
    port: process.env.CLOUD_DB_PORT,
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false }
};

console.log('Testing connection...');
mysql.createConnection(destConfig)
    .then(conn => {
        console.log('Connected successfully!');
        return conn.end();
    })
    .catch(err => {
        console.error('Connection failed:', err.message);
        process.exit(1);
    });
