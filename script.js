document.addEventListener('DOMContentLoaded', loadExpenses);
document.getElementById('expense-form').addEventListener('submit', addExpense);

const loadExpenses = () => {
    const expenses = JSON.parse(localStorage.getItem('expense'));
    expenses.forEach(expense => displayExpense(expense));
    updateTotal();
}

const addExpense = event => {
    event.preventdefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const data = document.getElementById('expense-date').value;
    const expense = { name, amount, date };

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpense(expense);
    updateTotal();
    document.getElementById('expense-form').reset();
}

const displayExpense(expense) {
    const list = document.getElementById('expense-list');
    const item = document.createElement('div');
    item.classList.add('expense-item');
    item.innerHTML = `
        <span>${expense.name} - $${expense.amount.toFixed(2)} (${expense.date})</span>
        <button onclick="removeExpense('${expense.name}', ${expense.amount})">Delete</button>
    `;
    list.appendChild(item);
}

function removeExpense(name, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses = expenses.filter(expense => !(expense.name === name && expense.amount === amount));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    document.getElementById('expense-list').innerHTML = '';
    expenses.forEach(expense => displayExpense(expense));
    updateTotal();
}

function updateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-expense').innerText = `Total: $${total.toFixed(2)}`;
}