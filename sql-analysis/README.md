# SQL Analysis: Online Store Sales Data

This project contains SQL queries to analyze sales data for an online store using SQLite.

## Files

1. `schema.sql`: Contains the table creation and sample data insertion
2. `analysis_queries.sql`: Contains all analysis queries with explanations

## Setup Instructions

1. Visit [SQLite Online](https://sqliteonline.com/)
2. Copy and paste the contents of `schema.sql` to create the table and insert data
3. Run each query from `analysis_queries.sql` separately to see the results

## Queries Explained

### 1. March 2024 Sales Volume
```sql
SELECT SUM(amount) as march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
```
- Expected Result: 27,000
- Calculation: Sum of all orders in March 2024
- Breakdown: 5,000 + 8,000 + 3,000 + 9,000 + 2,000 = 27,000

### 2. Top Spending Customer
```sql
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
```
- Expected Result: Alice with 20,000
- Calculation: Sum of all orders by Alice
- Breakdown: 5,000 + 3,000 + 10,000 + 2,000 = 20,000

### 3. Average Order Value
```sql
SELECT 
    ROUND(AVG(amount), 2) as average_order_value
FROM orders;
```
- Expected Result: 6,000
- Calculation: Total sum (48,000) / Number of orders (8)
- Breakdown: 48,000 / 8 = 6,000

## Additional Analysis

The queries also include a monthly sales breakdown that shows:
- Total sales per month
- Number of orders per month
- Average order value per month

## Notes

- All amounts are in currency units (e.g., dollars)
- Dates are in YYYY-MM-DD format
- Results are rounded to 2 decimal places where applicable 