/**
 * API routes
 */

const express = require('express');
const router = express.Router();

const {LOGIN, BOOKS, BOOK_BY_ID} = require('../constants/endpoints');
const statusCode = require('../constants/responseStatusCode');

const Book = require('../entities/book.js');

const store = require('../store');

/**
 * POST - авторизация пользователя
 */
router.post(LOGIN, (req, res) => {
  res.status(statusCode.CREATED);
  res.send({ id: 1, mail: "test@mail.ru" });
});

/**
 * GET - получить все книги
 */
router.get(BOOKS, (req, res) => {
  res.status(statusCode.OK);
  res.send(store.books);
});

/**
 * GET - получить книгу по ID
 */
router.get(BOOK_BY_ID, (req, res) => {
  const {id} = req.params;
  const book = store.books.find((item) => item.id === id);

  if (book) {
    res.status(statusCode.OK);
    res.send(book);

    return;
  }

  res.status(statusCode.NOT_FOUND);
  res.send({message: 'Book not found'});
});

/**
 * POST - создать книгу
 */
router.post(BOOKS, (req, res) => {
  const {body} = req;

  if (!body) {
    res.status(statusCode.BAD_REQUEST);
    res.send({message: 'No body'});

    return;
  }

  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = body;

  if (title && description && authors && favorite && fileCover && fileName) {
    const book  = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });

    store.books.push(book);

    res.status(statusCode.CREATED);
    res.send(book);

    return;
  }

  res.status(statusCode.BAD_REQUEST);
  res.send({
    isError: true,
    statusCode: statusCode.BAD_REQUEST,
    errorMessage: 'Incorrect body',
  });
});

/**
 * PUT - редактировать книгу по ID
 */
router.put(BOOK_BY_ID, (req, res) => {
  const {body, params} = req;
  const {id} = params;

  if (!body) {
    res.status(statusCode.BAD_REQUEST);
    res.send({message: 'No body'});

    return;
  }

  const book = store.books.find((item) => item.id === id);

  if (!book) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  book = {...book, ...body};

  res.status(statusCode.OK);
  res.send(book)
});

/**
 * DELETE - удалить книгу по ID
 */
router.delete(BOOK_BY_ID, (req, res) => {
  const {id} = params;
  const bookIndex = store.books.findIndex((item) => item.id === id);

  if (bookIndex < 0) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  store.books.splice(bookIndex, 1);

  res.status(statusCode.OK);
  res.send({message: 'The book is successfully deleted'})
});

module.exports = router;
