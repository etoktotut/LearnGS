"use strict";

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, вино, девочки');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 1000000;
const period = 12;
let expenses = [];

let showTypeOf = function (data) {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const start = function () {
    do { money = prompt('Ваш месячный доход:'); }
    while (!isNumber(money));
};

const getExpensesMonth = function () {
    let sum = 0;
    let exp;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            exp = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(exp));
        sum += +exp;
    }
    return sum;
};

const getStatusIncome = function (moneyPerDay) {
    if (moneyPerDay >= 1200) {
        return 'У вас высокий уровень дохода';
    }
    else if (moneyPerDay >= 600) {
        return 'У вас средний уровень дохода';
    }
    else if (moneyPerDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    }
    else {
        return 'Что то пошло не так';
    }
};

const getAccumulatedMonth = function (mon, expMonth) {
    return mon - expMonth;
};

const getTargetMonth = function (moneyTarget, moneyPerMonth) {
    return Math.ceil(moneyTarget / moneyPerMonth);
};

start();
let expensesMonth = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Доходы за месяц: ' + money);
console.log('Расходы за месяц: ' + expensesMonth);
console.log('Возможные расходы (массив): ', addExpenses.split(','));
console.log('Статьи обязательных расходов (массив): ', expenses);
console.log((getTargetMonth(mission, accumulatedMonth) >= 0) ?
    'Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' мес.' :
    'Цель не будет достигнута');
console.log('Бюджет на день составляет: ' + budgetDay + ' руб.');
console.log(getStatusIncome(budgetDay));

