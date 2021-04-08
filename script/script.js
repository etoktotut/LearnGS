"use strict";

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
};

let num = +prompt('Угадай число от 1 до 100').trim();

console.log(num);

const start = (num) => {
    if (!isNumber(num)) {
        num = + prompt('Введи число!');
        start(num);
    }
    return num;
};

const checkSecret = (x) => {
    const myCheck = (inp) => {
        if (x === inp) {
            alert('Поздравляю вы выиграли');
            return true;
        } else if (x > inp) {
            alert('Загаданное число меньше');
        } else if (x < inp) {
            alert('Загаданное число больше');
        }
        return false;
    };
    return myCheck;
};


let quest = checkSecret(18);
const mainFunction = (num1) => {
    if (!quest(start(num1))) {
        mainFunction();
    }
};

mainFunction(num);









