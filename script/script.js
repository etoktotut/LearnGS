//книги в порядок
const books = document.querySelectorAll('.book');
books[0].before(books[1]);
books[0].after(books[4]);
books[5].after(books[2]);

//замена картинки заднего фона
const wbody = document.querySelector('body');
wbody.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

//Исправление заголовка 
const errBookName = books[4].querySelector('h2 a');
errBookName.textContent = "Книга 3. this и Прототипы Объектов";

//удаление рекламы
const advSpare = document.querySelector('.adv');
advSpare.remove();

//Восстановление порядка элементов в книгах
const book2chapters = books[0].querySelectorAll('li');
book2chapters[9].after(book2chapters[2]);
book2chapters[3].after(book2chapters[6]);
book2chapters[6].after(book2chapters[8]);

const book5chapters = books[5].querySelectorAll('li');
book5chapters[1].after(book5chapters[9]);
book5chapters[4].after(book5chapters[2]);
book5chapters[7].after(book5chapters[5]);

//добавление главы
const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
const book6chapters = books[2].querySelectorAll('li');
book6chapters[8].insertAdjacentElement("afterend", newChapter);





