-- 1. Calculate total sales volume for March 2024
-- This query sums all order amounts where the order_date is in March 2024
SELECT SUM(amount) as march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- Expected result: 27,000
-- Explanation: Sum of orders from March 1st to March 30th
-- (5000 + 8000 + 3000 + 9000 + 2000 = 27000)

-- 2. Find the customer who spent the most overall
-- This query groups orders by customer, sums their total spending,
-- and orders by total spending in descending order
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Expected result: Alice with 20,000
-- Explanation: Sum of Alice's orders
-- (5000 + 3000 + 10000 + 2000 = 20000)

-- 3. Calculate the average order value
-- This query calculates the average amount across all orders
SELECT 
    ROUND(AVG(amount), 2) as average_order_value,
    ROUND(SUM(amount) / COUNT(*), 2) as alternative_calculation
FROM orders;

-- Expected result: 6,000
-- Explanation: Total sum (48000) divided by number of orders (8) = 6000

-- Additional Analysis: Monthly sales breakdown
SELECT 
    strftime('%Y-%m', order_date) as month,
    SUM(amount) as total_sales,
    COUNT(*) as number_of_orders,
    ROUND(AVG(amount), 2) as average_order_value
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month; 