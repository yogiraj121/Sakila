export const revenueByCategoryQuery = `
SELECT c.name AS category, SUM(p.amount) AS revenue
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE p.payment_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?)
GROUP BY c.name
ORDER BY revenue DESC;
`;
