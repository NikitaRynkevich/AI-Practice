const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

describe('FakeStore API Product Tests', () => {
    let response;
    let products;

    // Fetch data once before all tests
    beforeAll(async () => {
        try {
            response = await axios.get(API_URL);
            products = response.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    });

    // Test server response
    test('Server should respond with status code 200', () => {
        expect(response.status).toBe(200);
    });

    // Test data structure
    test('Response should contain an array of products', () => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    // Test each product for required attributes
    describe('Product Data Validation', () => {
        const defectiveProducts = {
            emptyTitles: [],
            negativePrices: [],
            invalidRatings: []
        };

        test('Each product should have required attributes with valid values', () => {
            products.forEach(product => {
                // Check title
                expect(product).toHaveProperty('title');
                if (!product.title || product.title.trim() === '') {
                    defectiveProducts.emptyTitles.push({
                        id: product.id,
                        title: product.title
                    });
                }

                // Check price
                expect(product).toHaveProperty('price');
                expect(typeof product.price).toBe('number');
                if (product.price < 0) {
                    defectiveProducts.negativePrices.push({
                        id: product.id,
                        price: product.price
                    });
                }

                // Check rating
                expect(product).toHaveProperty('rating');
                expect(product.rating).toHaveProperty('rate');
                expect(typeof product.rating.rate).toBe('number');
                if (product.rating.rate > 5) {
                    defectiveProducts.invalidRatings.push({
                        id: product.id,
                        rating: product.rating.rate
                    });
                }
            });
        });

        // Report defective products
        afterAll(() => {
            console.log('\nDefective Products Report:');
            
            if (defectiveProducts.emptyTitles.length > 0) {
                console.log('\nProducts with empty titles:');
                console.table(defectiveProducts.emptyTitles);
            }

            if (defectiveProducts.negativePrices.length > 0) {
                console.log('\nProducts with negative prices:');
                console.table(defectiveProducts.negativePrices);
            }

            if (defectiveProducts.invalidRatings.length > 0) {
                console.log('\nProducts with invalid ratings (> 5):');
                console.table(defectiveProducts.invalidRatings);
            }

            if (Object.values(defectiveProducts).every(arr => arr.length === 0)) {
                console.log('No defects found in the product data.');
            }
        });
    });

    // Additional data quality tests
    describe('Data Quality Checks', () => {
        test('All products should have unique IDs', () => {
            const ids = products.map(product => product.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(products.length);
        });

        test('All products should have a category', () => {
            products.forEach(product => {
                expect(product).toHaveProperty('category');
                expect(typeof product.category).toBe('string');
                expect(product.category.trim()).not.toBe('');
            });
        });

        test('All products should have a description', () => {
            products.forEach(product => {
                expect(product).toHaveProperty('description');
                expect(typeof product.description).toBe('string');
                expect(product.description.trim()).not.toBe('');
            });
        });
    });
}); 