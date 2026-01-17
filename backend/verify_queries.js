import { pool } from './src/db.js';

async function testQuery() {
    try {
        const startDate = '2005-01-01';
        const endDate = '2006-01-01';
        const storeId = null;

        console.log('Testing getKeyMetrics...');
        const [metrics] = await pool.query(`
SELECT 
  SUM(p.amount) AS totalRevenue,
  COUNT(r.rental_id) AS activeRentals
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE p.payment_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?);
`, [startDate, endDate, storeId, storeId]);
        console.log('Metrics:', metrics[0]);

        console.log('Testing topRentedFilms...');
        const [films] = await pool.query(`
SELECT f.title, COUNT(r.rental_id) AS rentalCount
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.rental_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?)
GROUP BY f.title
ORDER BY rentalCount DESC
LIMIT 5;
`, [startDate, endDate, storeId, storeId]);
        console.log('Top Film:', films[0]?.title);

        process.exit(0);
    } catch (error) {
        console.error('Query failed:', error);
        process.exit(1);
    }
}

testQuery();
