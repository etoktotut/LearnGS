//"use strict";

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
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositBank = document.querySelector('.deposit-bank');
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
        this.getExpInc();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddIncExp();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        this.blockAndShowBtnReset();
        this.saveToStorage();
    }

    saveToStorage() {
        const inputList = document.querySelectorAll('.result input');
        inputList.forEach(item => localStorage.setItem(item.className, item.value));
        inputList.forEach(item => {
            this.setCookie(item.className, item.value);
        });
        this.setCookie('isLoad', true);



    }

    loadFromStorage() {
        const inputList = document.querySelectorAll('.result input');
        inputList.forEach(item => {
            // const temp = localStorage.getItem(item.className);
            // if (temp !== null) {
            //     item.value = temp;
            // }
            const temp = this.getCookie(encodeURIComponent(item.className));

            if (typeof temp !== 'undefined') {
                item.value = temp;
            }

        });
    }

    clearStorage() {
        const inputList = document.querySelectorAll('.result input');

        inputList.forEach(item => {
            if (localStorage.getItem(item.className) !== null) {
                localStorage.removeItem(item.className);
            }
            this.deleteCookie(item.className);

        });
        this.setCookie('isLoad', false);
    }

    cookieWasBroken() {
        const inputList = document.querySelectorAll('.result input');
        let result = false;
        if (this.getCookie('isLoad') === 'true') {
            inputList.forEach(item => {
                const temp = this.getCookie(encodeURIComponent(item.className));
                if ((typeof temp === 'undefined') || (temp !== localStorage.getItem(item.className))) {
                    result = true;
                }
            });
        }
        //console.log('Cookie was broken', result);
        if (result) {
            this.reset();
        }
    }




    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        this.setCookie(name, "", {
            'max-age': -1
        });
    }






    blockAndShowBtnReset() {
        document.querySelectorAll('.data input[type="text"]').forEach(item => {
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

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

        document.querySelectorAll('input[type="text"]').forEach(item => {
            item.value = '';
            item.removeAttribute('disabled');
        });
        btnExpensesPlus.setAttribute('style', 'display: block ;');
        btnIncomePlus.setAttribute('style', 'display: block ;');

        this.depositReset();

        periodSelect.value = 1;
        periodAmount.textContent = 1;
        this.clearStorage();
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
            elem.value = elem.value.replace(/[^а-яёА-ЯЁ.;,:\-_?!() "]/gi, '');
        });
    }

    approvedDigits(elem) {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/g, '');
        });
    }

    makeEmptyInputsWithListeners(elem) {
        elem.querySelectorAll('input').forEach(item => item.value = '');
        this.withotEngSymbols(elem.querySelector('[placeholder="Наименование"]'));
        this.approvedDigits(elem.querySelector('[placeholder="Сумма"]'));
    }

    addBlock(event) {
        const strClass = event.target.parentNode.className;
        let itemsForClone = document.querySelectorAll(`.${strClass}-items`);
        const cloneItem = itemsForClone[0].cloneNode(true);
        this.makeEmptyInputsWithListeners(cloneItem);
        itemsForClone[0].parentNode.insertBefore(cloneItem, event.target);
        itemsForClone = document.querySelectorAll(`.${strClass}-items`);
        if (itemsForClone.length === 3) {
            event.target.setAttribute('style', 'display: none;');
        }
        // вот тут некрасиво
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
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
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getExpensesMonth() {
        this.expensesMonth = 0;
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return;
    }

    getAddIncExp() {
        // набивка переданного массива переданным значением
        const pushArr = (item, strArr) => {
            item = item.trim();
            if (item !== '') {
                strArr.push(item);
            }
        };
        //
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => pushArr(item, this.addExpenses));

        additionalIncomeItem.forEach(item => pushArr(item.value, this.addIncome));
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return;
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    // thisStatusIncome() {
    //     if (this.budgetDay >= 1200) {
    //         return 'У вас высокий уровень дохода';
    //     } else if (this.budgetDay >= 600) {
    //         return 'У вас средний уровень дохода';
    //     } else if (this.budgetDay >= 0) {
    //         return 'К сожалению у вас уровень дохода ниже среднего';
    //     } else {
    //         return 'Что то пошло не так';
    //     }
    // }


    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }

    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            startButton.setAttribute('disabled', 'true');
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                depositPercent.value = depositPercent.value.replace(/\D/g, '');
                if (depositPercent.value > 100) {
                    startButton.setAttribute('disabled', 'true');
                    depositPercent.value = '';
                    alert("Введите корректное значение в поле проценты");
                } else if (depositPercent.value !== '') {
                    startButton.removeAttribute('disabled');
                }
            });
        } else {
            startButton.removeAttribute('disabled');
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }

    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';

            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);

        } else {
            this.depositReset();
        }
    }

    depositReset() {
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        depositBank.removeEventListener('change', this.changePercent);
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
        document.querySelectorAll('.data [placeholder="Сумма"]').forEach(item => this.approvedDigits(item));
        document.querySelectorAll('.data [placeholder="Наименование"]').forEach((item) => this.withotEngSymbols(item));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        this.cookieWasBroken();
        this.loadFromStorage();

    }
}


const appData = new AppData();
appData.eventsListeners();