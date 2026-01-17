export const keyMetricsQuery = `
SELECT 
  SUM(p.amount) AS totalRevenue,
  COUNT(r.rental_id) AS activeRentals
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE p.payment_date BETWEEN ? AND ?
AND (? IS NULL OR i.store_id = ?);
`;
