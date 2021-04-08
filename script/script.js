"use strict";
// проверка введенного значения - должно быть числом и больше 0
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && +n > 0 && +n <= 100;
};

//функция ввода запроса на ввод числа
const startInputNumber = () => {
    let num1 = prompt("Введи число от 1 до 100!");//+ ставить нельзя - не получим null
    // проверка нажатия кнопки ОТМЕНА
    if (num1 === null) {
        return false;
    }
    //проверка, что введенное значение является числом    
    if (!isNumber(+num1)) {
        // если ввели не число, то снова запрашиваем ввод числа
        return startInputNumber();
    }
    // возвращаем введенное число
    return +num1;
};

// функция угадайка - возвращает функцию сравнивающую передаваемое значение (inp) с хранимой переменной (x)
const checkSecret = (x) => {
    const myCheck = (inp) => {
        if (x === inp) {
            alert("Поздравляю вы выиграли");
            return true;
        } else if (x > inp) {
            alert("Загаданное число меньше");
        } else if (x < inp) {
            alert("Загаданное число больше");
        }
        return false;
    };
    return myCheck;
};


//тело программы
const startMain = () => {
    let num = +prompt("Угадай число от 1 до 100"); // первый запрос
    // Проверяем не нажата ли "Отмена"
    if (num === null) {
        alert("Игра окончена");
        return;
    }
    // вешаем на quest функцию-угадайку проверку угадано ли число и задаем число 18 в качестве параметра
    let quest = checkSecret(18);

    // рекурсивная функция запросов и проверки угадывания
    const inputAndCheck = (numForCheck) => {
        let s = numForCheck; // numForCheck нам реально нужен в первый раз, не знаю как обойти
        //если ввели не число, но надо ждать пока введут или откажутся
        if (!isNumber(s)) {
            s = startInputNumber();
        }
        // если не отказались, то значит передали число и его надо проверить в угадайке                  
        if (s) {
            if (!quest(s)) {
                inputAndCheck(); // число не угадано - снова вызываем сами себя
            }
        }
        return;
    };

    inputAndCheck(num);//проверка введенного значения при начале игры
    alert("Игра окончена");
};

// СТАРТУЕМ ТУТ!!!
startMain();
