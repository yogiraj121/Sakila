export const topCustomersQuery = `
SELECT CONCAT(c.first_name,' ',c.last_name) AS customer,
       COUNT(r.rental_id) AS totalRentals,
       SUM(p.amount) AS totalSpent
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE p.payment_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?)
GROUP BY customer
ORDER BY totalSpent DESC
LIMIT 10;
`;
