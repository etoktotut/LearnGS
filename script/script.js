"use strict";

const startButton = document.getElementById('start');
const btnReset = document.getElementById('cancel');
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

class AppData {
    constructor() {
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
    }

    start() {
        this.budget = +salaryAmount.value;
        // this.getExpenses();
        // this.getIncome();
        this.getExpInc();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        // appData.getInfoDeposit();
        this.showResult();
        this.blockAndShowBtnReset();
    }

    blockAndShowBtnReset() {
        document.querySelectorAll('.data input[type="text"]').forEach((item) => {
            item.setAttribute('disabled', 'true');
        });
        startButton.setAttribute('style', 'display: none;');
        btnReset.setAttribute('style', 'display: block;');
        btnReset.removeAttribute('disabled');
    }

    reset() {
        //кнопки
        btnReset.setAttribute('disabled', 'true');
        btnReset.setAttribute('style', 'display: none;');
        startButton.setAttribute('style', 'display: block;');
        startButton.setAttribute('disabled', 'true');
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
            incomeItems[i - 1].remove();
        }
        for (let i = expensesItems.length; i > 1; i--) {
            expensesItems[i - 1].remove();
        }
        document.querySelectorAll('input[type="text"]').forEach((item) => {
            item.value = '';
            item.removeAttribute('disabled');
        });
        btnExpensesPlus.setAttribute('style', 'display: block ;');
        btnIncomePlus.setAttribute('style', 'display: block ;');
        depositCheck.checked = false;
        periodSelect.value = 1;
        periodAmount.textContent = 1;
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    withotEngSymbols(elem) {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^а-яёА-ЯЁ\.\;\,\:\-_\?\!\(\)\ \"]/gi, '');
        });
    }

    approvedDigits(elem) {
        elem.addEventListener('input', function (event) {
            elem.value = elem.value.replace(/\D/g, '');
        });
    }

    makeEmptyInputsWithListeners(elem) {
        elem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        this.withotEngSymbols(elem.querySelector('[placeholder="Наименование"]'));
        this.approvedDigits(elem.querySelector('[placeholder="Сумма"]'));
    }

    addBlock(event) {
        const strClass = event.target.parentNode.className;
        let itemsForClone = document.querySelectorAll(`.${strClass}-items`);
        const cloneItem = itemsForClone[0].cloneNode(true);
        // вот тут appData - и как избавиться от нее - не понимаю
        this.makeEmptyInputsWithListeners(cloneItem);
        itemsForClone[0].parentNode.insertBefore(cloneItem, event.target);
        itemsForClone = document.querySelectorAll(`.${strClass}-items`);
        if (itemsForClone.length === 3) {
            event.target.setAttribute('style', 'display: none;');
        }

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            console.log(startStr);
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        expensesItems.forEach(count);
        incomeItems.forEach(count);
    }

    getIncomeMonth() {
        this.incomeMonth = 0;
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getExpensesMonth() {
        this.expensesMonth = 0;
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return;
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }


    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return;
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    thistStatusIncome() {
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!this.isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!this.isNumber(this.moneyDeposit));
        }
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    eventsListeners() {
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value.trim() !== '' && this.isNumber(salaryAmount.value)) {
                startButton.removeAttribute('disabled');
            } else {
                startButton.setAttribute('disabled', 'true');
            }
        });

        btnExpensesPlus.addEventListener('click', this.addBlock.bind(this));
        btnIncomePlus.addEventListener('click', this.addBlock.bind(this));
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        btnReset.addEventListener('click', () => this.reset());
        startButton.addEventListener('click', () => this.start());
        startButton.setAttribute('disabled', 'true');
        document.querySelectorAll('.data [placeholder="Сумма"]').forEach((item) => {
            this.approvedDigits(item);
        });
        document.querySelectorAll('.data [placeholder="Наименование"]').forEach((item) => {
            this.withotEngSymbols(item);
        });
    }
}


const appData = new AppData();
appData.eventsListeners();