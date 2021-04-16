"use strict";

const startButton = document.getElementById('start');
const btnIncomePlus = document.getElementsByTagName('button')[0];
const btnExpensesPlus = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// поля справа
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

// оставшиеся поля
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const incomeTitle = document.querySelector('.income-title');
// const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// const depositAmount = document.querySelector('.deposit-amount');
// const depositPercent = document.querySelector('.deposit-percent');
// const depositBank = document.querySelector('.deposit-bank');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

let btnReset;

const allInputs = document.querySelectorAll('input');



let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = (s) => {
    return !isNumber(s) && s !== '';
};

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budget: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        // appData.getInfoDeposit();

        this.showResult();
    },

    reset: function () {
        //кнопки
        startButton.setAttribute('disabled', 'true');
        btnReset.style.display = 'none';
        //appData
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budget = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        //html в начальный вид
        for (let i = incomeItems.length; i > 1; i--) {
            incomeItems[i].remove();
        }
        console.log(incomeItems);


    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },

    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true); //см роедыдущий урок
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnExpensesPlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    addIncomeBlock: function () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnIncomePlus.style.display = 'none';
        }
    },

    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },

    getIncomeMonth: function () {
        appData.incomeMonth = 0;
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {
        appData.expensesMonth = 0;
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return;
    },

    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },

    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};

const btnResetAdd = () => {
    let btnStartClone = startButton.cloneNode('true');
    btnStartClone.style.display = 'none';
    btnStartClone.className = 'button-reset';
    btnStartClone.textContent = 'RESET';
    startButton.insertAdjacentElement('beforebegin', btnStartClone);
    btnReset = document.querySelector('.button-reset');
    btnReset.addEventListener('click', appData.reset);
};


salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)) {
        startButton.removeAttribute('disabled');
    } else {
        startButton.setAttribute('disabled', 'true');
    }
});

btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});
startButton.addEventListener('click', appData.start);
startButton.setAttribute('disabled', 'true'); //поле зарплаты пустое, нам нечего рассчитывать