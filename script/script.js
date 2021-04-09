"use strict";

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && +n > 0 && +n <= 100;
};

const startInputNumber = (mess) => {
    let num1 = prompt(mess);
    if (num1 === null) {
        return false;
    }
    if (!isNumber(+num1)) {
        return startInputNumber("Введите число!");
    }
    return +num1;
};

const getGame = (x) => {
    const game = (mes) => {
        console.log(mes);
        let num = startInputNumber(mes);
        if (!num) { return alert("Игра окончена"); }
        if (num === x) { return alert('Вы угадали'); }
        if (num > x) { return game('Загаданное число больше'); }
        else { return game('Загаданное число меньше'); }
    };
    return game;
};


const myGame = getGame(18);
myGame("Введите число от 1 до 100");