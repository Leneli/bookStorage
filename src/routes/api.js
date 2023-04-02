/**
 * API routes
 */

const express = require('express');
const router = express.Router();

const {getBooks, createBook} = require('../api');

const {LOGIN, BOOKS, BOOK_BY_ID} = require('../constants/endpoints');
const statusCode = require('../constants/responseStatusCode');

const {updateStore} = require('../store');

const Book = require('../entities/book.js');

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
  const books = getBooks();

  res.status(statusCode.OK);
  res.send(books);
});

/**
 * GET - получить книгу по ID
 */
router.get(BOOK_BY_ID, (req, res) => {
  const {id} = req.params;
  const book = getBooks(id);

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
    fileBook,
  } = body;

  if (title && description && authors && favorite && fileCover && fileName && fileBook) {
    const book  = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });

    const {statusCode: createStatusCode, message} = createBook(book);

    res.status(createStatusCode);
    res.send(createStatusCode === statusCode.CREATED ? book : message);

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

  const book = getBooks(id);

  if (!book) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  // TODO: Update store
  book = {...book, ...body};

  res.status(statusCode.OK);
  res.send(book)
});

/**
 * DELETE - удалить книгу по ID
 */
router.delete(BOOK_BY_ID, (req, res) => {
  const {id} = params;
  const books = getBooks();
  const bookIndex = books.findIndex((item) => item.id === id);

  if (bookIndex < 0) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  // TODO: Delete book fron store
  // books.splice(bookIndex, 1);

  res.status(statusCode.OK);
  res.send({message: 'The book is successfully deleted'})
});

module.exports = router;
