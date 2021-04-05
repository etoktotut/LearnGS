let money = 60000;
const income = 'фриланс';
let addExpenses = 'Налоги, Страховка, Учеба, Хобби';
let deposit = true;
const mission = 1000000;
const period = 12;

console.log('Type of money: ', typeof (money));
console.log('Type of income: ', typeof (income));
console.log('Type of deposit: ', typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

// Д.З урок 3
money = +prompt('Ваш месячный доход:');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц', budgetMonth);

console.log('Цель будет достигнута за', Math.ceil(mission / budgetMonth) + ' мес.');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) { console.log('У вас высокий уровень дохода'); }
else if (budgetDay >= 600) { console.log('У вас средний уровень дохода'); }
else if (budgetDay >= 0) { console.log('К сожалению у вас уровень дохода ниже среднего'); }
else { console.log('Что то пошло не так'); }
















