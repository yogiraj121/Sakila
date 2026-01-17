export const topRentedFilmsQuery = `
SELECT f.title, COUNT(r.rental_id) AS rentalCount
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.rental_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?)
GROUP BY f.title
ORDER BY rentalCount DESC
LIMIT 5;
`;
