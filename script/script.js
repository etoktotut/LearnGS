const money = 60000;
const income = 'фриланс';
const addExpenses = 'Налоги, Страховка, Учеба, Хобби';
const deposit = true;
const mission = 1000000;
const period = 12;

console.log('Type of money: ', typeof (money));
console.log('Type of income: ', typeof (income));
console.log('Type of deposit: ', typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');

console.log(addExpenses.toLowerCase().split(', '));

const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);







