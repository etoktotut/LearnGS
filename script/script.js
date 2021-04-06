"use strict";
let money = 60000;
const income = 'фриланс';
let addExpenses = 'Налоги, Страховка, Учеба, Хобби';
let deposit = true;
const mission = 1000000;
const period = 12;

let showTypeOf = function (data) {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = +prompt('Ваш месячный доход:');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);

let getStatusIncome = function (moneyPerDay) {
    if (moneyPerDay >= 1200) { return 'У вас высокий уровень дохода'; }
    else if (moneyPerDay >= 600) { return 'У вас средний уровень дохода'; }
    else if (moneyPerDay >= 0) { return 'К сожалению у вас уровень дохода ниже среднего'; }
    else { return 'Что то пошло не так'; }
};


const getExpensesMonth = function () {
    return amount1 + amount2;
};

const getAccumulatedMonth = function () {
    return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function (moneyTarget, moneyPerMonth) {
    return Math.ceil(moneyTarget / moneyPerMonth);
};

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Расходы за месяц: ' + getExpensesMonth());
console.log('Возможные расходы (массив): ', addExpenses.split(','));
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' мес.');
console.log('Бюджет на день составляет: ' + budgetDay + ' руб.');
console.log(getStatusIncome(budgetDay));

