const form = document.getElementById('form');
const transactionsEl = document.getElementById('transactions');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = Number(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  transactions.push({
    id: Date.now(),
    description,
    amount,
    type
  });

  saveAndRender();
  form.reset();
});

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  render();
}

function render() {
  transactionsEl.innerHTML = '';

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${t.description}</td>
      <td>
        <span class="tag ${t.type}">
          ${t.type === 'income' ? 'Entrada' : 'Saída'}
        </span>
      </td>
      <td>${t.amount.toFixed(2)}</td>
      <td>
        <button class="delete" onclick="removeTransaction(${t.id})">
          Excluir
        </button>
      </td>
    `;

    transactionsEl.appendChild(tr);

    if (t.type === 'income') {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  balanceEl.innerText = (income - expense).toFixed(2);
  incomeEl.innerText = income.toFixed(2);
  expenseEl.innerText = expense.toFixed(2);
}

render();
