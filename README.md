# BookStorage - приложение «Библиотека»
*Домашнее задание к занятию «2.1. Express»*

**Правила выполнения домашней работы:** 
* выполняйте домашнее задание в отдельной ветке проекта на GitHub,
* в поле для сдачи работы прикрепите ссылку на ваш проект в Git,
* присылать на проверку можно каждую задачу по отдельности или все задачи вместе, 
* во время проверки по частям ваша домашняя работа будет обозначаться статусом «На доработке»,
* любые вопросы по решению задач задавайте в канале вашей группы.

#### Задание 1.1
Создать новый пустой проект и установить в него **express.js**. 


#### Задание 1.2
Разработать **API CRUD** для работы с сущностью *«книга»*. Каждый экземпляр книги должен содержать следующую структуру данных: 
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
``` 

### методы
Метод | URL | Действие | Комментарий
--- | --- | ---  | ---
`POST` | `/api/user/login` | авторизация пользователя | метод всегда возвращает **Code: 201** и статичный объект: `{ id: 1, mail: "test@mail.ru" }`
`GET` | `/api/books` | получить все книги | получаем массив всех книг
`GET` | `/api/books/:id` | получить книгу по **ID** | получаем объект книги, если запись не найдена, вернём **Code: 404** 
`POST` | `/api/books` | создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **ID**
`PUT` | `/api/books/:id` | редактировать книгу по **ID** | редактируем объект книги, если запись не найдена, вернём **Code: 404**
`DELETE` | `/api/books/:id` | удалить книгу по **ID** | удаляем книгу и возвращаем ответ: **'ok'**

---


## Middleware. Паттерн "цепочка обязанностей"

#### Задание 2.1
Обновить структуру роутинга проекта с использованием **express.Router()**.


#### Задание 2.2
Установить в проект пакет [**multer**](https://github.com/expressjs/multer/blob/master/doc/README-ru.md)
и создать middleware для загрузки файла книги. 
Созданную middleware подключить и обработать в роутах создания данных о книге.

Каждый экземпляр книги должен содержать следующую структуру данных: 
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: bool,
  fileCover: "string",
  fileName: "string",
  fileBook: "string"  //новое поле
}
``` 

#### Задание 2.3
Создать роут `GET: /api/books/:id/download`. 
Метод отдаёт на скачиваение файл книги по её **:id**.

---


## EJS. Шаблонизаторы

#### Задание 3.1
Установить в проект шаблонизатор [**ejs**](https://ejs.co/).

#### Задание 3.2
Разработать многостраничный интерфейс для работы с сущностью «книга» с использованием шаблонизатора *ejs*.

Шаблоны:
 - **index** — просмотр списка всех книг (вывод заголовков);
 - **view** — информация по конкретной книге;
 - **create** — создание книги;
 - **update** — редактирование книги. 
 
---


## Docker: контейнеризация приложения

#### Задание 4.1: контейнеризация

Контейнеризировать приложение «Библиотека» и опубликовать его на hub.docker.com.

### Критерии выполнения
В результате выполнения задания в исходном коде приложения должен появиться Dockerfile. А в публичном репозитории, созданном пользователем на hub.docker.com, — образ.

#### Задание 4.2: микросервисы

Добавьте в приложение счётчик просмотра книг:
- счётчик увеличивается при каждом просмотре книги,
- за хранение значения счётчика отвечает отдельное приложение,
- данные счётчика хранятся на диске и переживают рестарт приложения или контейнера.

Используйте docker-compose для разработки приложения в контейнере.

### Критерии выполнения
В результате выполнения задания 
1. Создано приложение Node.js, обрабатывающее два роута:
   - увеличить счётчик `POST /counter/:bookId/incr`;
   - получить значение счётчика `GET /counter/:bookId`
  — приложение контейнеризировано.
1. В основном приложении при просмотре книги:
   - увеличение счётчика,
   - отображение значения счётчика;
1. Создан docker-compose.yml, запуск которого поднимает оба приложения и позволяет продемонстрировать работу счётчика.

В исходном коде приложения должен появиться docker-compose.yml.

---



## База данных и хранение данных

#### Задание 5.1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации об использовании [**CRUD Operations**](https://docs.mongodb.com/manual/crud/).

#### Задание 5.2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
 - запрос для *поиска* полей документов коллекции **books** по полю *title*,
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 


#### Решение к заданию 5.2

 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
 ```javascript
db.books.insertMany(
  [
    {
      _id: 1,
      title: "Book #1",
      description: "Book #1: description",
      authors: "Book #1: Authors",
    },
    {
      _id: 2,
      title: "Book #2",
      description: "Book #2: description",
      authors: "Book #2: Authors",
    },
  ]
);
``` 

 - запрос для *поиска* полей документов коллекции **books** по полю *title*
 ```javascript
db.books.find({title: 'Book #1'});
``` 

 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
 ```javascript
db.books.updateOne(
  {
    _id: {
      $eq: 1,
    },
  },
  {
    $set: {
      description: 'New description',
      authors: 'New authors',
    },
  },
);
``` 

---



## Подключение MongoDB в Node.js приложение

#### Задание 6.1

Установите пакет **Mongoose** в свой проект и настройте подключение к базе данных.
При подключении к локальной базе данных через [docker](https://hub.docker.com/_/mongo) создайте в своём проекте файл `docker-compose.yml`.


#### Задание 6.2
Создайте **Mongoose-схему** для коллекции **«books»**.
Структура документа должна соответствовать следующей структуре объекта:
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
``` 

#### Задание 6.3
Перепишите все методы, работающие со статичным объектом `Books`, на соответствующие методы для работы с `Mongoose Model Books`.

Метод | URL | Действие | Комментарий
--- | --- | ---| ---
`GET` | `/api/books` | Получить все книги | Получаем массив всех книг
`GET` | `/api/books/:id` | Получить книгу по **ID** | Получаем объект книги, если запись не найдена, вернём **Code: 404** 
`POST` | `/api/books` | Создать книгу | Создаём книгу и возвращаем её же вместе с присвоенным **ID**
`PUT` | `/api/books/:id` | Редактировать книгу по **ID** | Редактируем объект книги, если запись не найдена, вернём **Code: 404**
`DELETE` | `/api/books/:id` | Удалить книгу по **ID** | Удаляем книгу и возвращаем ответ: **'ok'**
