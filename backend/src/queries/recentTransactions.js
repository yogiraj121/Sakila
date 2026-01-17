export const recentTransactionsQuery = `
SELECT p.payment_id, CONCAT(c.first_name,' ',c.last_name) AS customerName,
       f.title, p.amount, p.payment_date
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE p.payment_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?)
ORDER BY p.payment_date DESC
LIMIT 10;
`;
