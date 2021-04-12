"use strict";

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = (s) => {
    return !isNumber(s) && s !== '';
};

let money = 0;

const start = function () {
    do {
        money = prompt('Ваш месячный доход:', 60000);
    }
    while (!isNumber(money));

};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budget: +money,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Курьерю').trim();
            }
            while (!isString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц Вы на этом зарабатывате?', 5000).trim();
            }
            while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }


        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кино, Вино, Девочки');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let sumOfOrderedExpenses, orderedExpenses;
            do {
                orderedExpenses = prompt('Введите обязательную статью расходов?', 'квартплата').trim();
            }
            while (!isString(orderedExpenses));
            do {
                sumOfOrderedExpenses = prompt('Во сколько это обойдется?', '10000');
            }
            while (!isNumber(sumOfOrderedExpenses));
            appData.expenses[orderedExpenses] = +sumOfOrderedExpenses;
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return;
    },

    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
        return appData.budgetMonth * appData.period;
    }

};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();


console.log('Доходы за месяц: ' + appData.budget + ' руб.');
console.log('Расходы за месяц: ' + appData.expensesMonth + ' руб.');
console.log((appData.budgetMonth) > 0 ?
    'Цель будет достигнута за ' + appData.getTargetMonth() + ' мес.' :
    'Цель не будет достигнута');
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ": " + appData[key]);
}

let stringExpensesForConsole = '';
for (let key in appData.expenses) {
    stringExpensesForConsole += key[0].toUpperCase() + key.slice(1) + ", ";
}
console.log(stringExpensesForConsole);

const startButton = document.getElementById('start');
const btnFirstPlus = document.getElementsByTagName('button')[0];
const btnSecondPlus = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
additionalIncomeItem1.value = "Item1";
additionalIncomeItem2.value = "Item2";
// поля справа
//const budget_month-value = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

// оставшиеся поля
const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.querySelector('.income-items');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
// const depositAmount = document.querySelector('.deposit-amount');
// const depositPercent = document.querySelector('.deposit-percent');
// const depositBank = document.querySelector('.deposit-bank');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');






