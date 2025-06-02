// Store expenses in an array
let expenses = [];

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expensesList = document.getElementById('expensesList');
const totalExpensesElement = document.getElementById('totalExpenses');
const averageExpenseElement = document.getElementById('averageExpense');
const topExpensesElement = document.getElementById('topExpenses');

// Add expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (category && amount > 0) {
        const expense = {
            id: Date.now(),
            category,
            amount
        };
        
        expenses.push(expense);
        updateExpensesList();
        calculateExpenses();
        
        // Reset form
        expenseForm.reset();
    }
});

// Update expenses list in the table
function updateExpensesList() {
    expensesList.innerHTML = '';
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpensesList();
    calculateExpenses();
}

// Calculate all expense metrics
function calculateExpenses() {
    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpensesElement.textContent = `$${total.toFixed(2)}`;
    
    // Calculate average daily expense (assuming 30 days per month)
    const average = total / 30;
    averageExpenseElement.textContent = `$${average.toFixed(2)}`;
    
    // Find top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    
    // Update top expenses list
    if (topExpenses.length > 0) {
        topExpensesElement.innerHTML = topExpenses
            .map(expense => `
                <li>${expense.category}: $${expense.amount.toFixed(2)}</li>
            `)
            .join('');
    } else {
        topExpensesElement.innerHTML = '<li>No expenses yet</li>';
    }
}

// Add sample data
function addSampleData() {
    const sampleData = [
        { category: 'Groceries', amount: 15000 },
        { category: 'Rent', amount: 40000 },
        { category: 'Transportation', amount: 5000 },
        { category: 'Entertainment', amount: 10000 },
        { category: 'Communication', amount: 2000 },
        { category: 'Gym', amount: 3000 }
    ];
    
    sampleData.forEach(item => {
        expenses.push({
            id: Date.now() + Math.random(),
            ...item
        });
    });
    
    updateExpensesList();
    calculateExpenses();
}

// Add a button to load sample data
const sampleDataBtn = document.createElement('button');
sampleDataBtn.textContent = 'Load Sample Data';
sampleDataBtn.className = 'btn-add';
sampleDataBtn.style.marginBottom = '1rem';
sampleDataBtn.onclick = addSampleData;

// Insert the button after the form
expenseForm.parentNode.insertBefore(sampleDataBtn, expenseForm.nextSibling); 