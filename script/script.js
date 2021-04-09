"use strict";

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 0;

const start = function () {
    do {
        money = prompt('Ваш месячный доход:').trim();
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
    mission: 1000000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кино, Вино, Девочки');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let exp;
            let temp = prompt('Введите обязательную статью расходов?');
            do {
                exp = prompt('Во сколько это обойдется?').trim();
            }
            while (!isNumber(exp));
            appData.expenses[temp] = +exp;
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
        }
        else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        }
        else if (appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return 'Что то пошло не так';
        }
    },

};

appData.asking();
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