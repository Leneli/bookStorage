import {BooksRepository} from '../entities/BooksRepository';

const express = require('express');
const router = express.Router();

const {fileMulter} = require('../middleware');
const {redisClient} = require('../store');

const {LOGIN, BOOKS, BOOK_BY_ID, BOOK_DOWNLOAD, BOOK_INCREMENT} = require('../constants/endpoints');
const statusCode = require('../constants/responseStatusCode');

const booksContainer = require('../IoC/container');

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
router.get(BOOKS, async (req, res) => {
  try {
    const repo = booksContainer(BooksRepository);
    const books = await repo.getBooks();
  
    res.status(statusCode.OK);
    res.send(books);
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * GET - получить книгу по ID
 */
router.get(BOOK_BY_ID, async (req, res) => {
  const {id} = req.params;

  try {
    const repo = booksContainer(BooksRepository);
    const book = await repo.getBook(id);

    if (book) {
      res.status(statusCode.OK);
      res.send(book);
    } else {
      res.status(statusCode.NOT_FOUND);
      res.send({message: 'Book not found'});
    }
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * POST - создать книгу
 */
router.post(BOOKS, fileMulter.single('fileBook'), async (req, res) => {
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
  } = body;
  let fileBookPath = '';
  let fileBookName = '';
  let fileBookOriginalName = '';
  let bookTitle = title || '';

  if(req.file) {
    const {path, originalname, filename} = req.file;

    fileBookPath = path;
    fileBookName = filename;
    fileBookOriginalName = filename; // originalname; // TODO: encoding

    if (!bookTitle) bookTitle = originalname;
  }

  if (fileBookPath && bookTitle) {
    const book  = {
      title: bookTitle,
      description,
      authors,
      favorite,
      fileCover,
      fileName: fileBookName,
      fileBook: fileBookPath,
      fileBookOriginalName,
    };

    try {
      const repo = booksContainer(BooksRepository);
      const newBook = await repo.createBook(book);

      await newBook.save();

      res.status(statusCode.CREATED);
      res.send(newBook);
    } catch (error) {
      res.status(statusCode.BAD_REQUEST);
      res.send(error);
    }

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
 * GET - скачать книгу
 */
router.get(BOOK_DOWNLOAD, async (req, res) => {
  const {params} = req;
  const {id} = params;
  const repo = booksContainer(BooksRepository);
  const book = await repo.getBook(id);

  if (!book) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  try {
    res.download(book.fileBook, book.fileBookOriginalName);
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send({message: `Unable to download file by ID ${id}`});
  }
});

/**
 * PUT - редактировать книгу по ID
 */
// TODO: PUT method from form
router.post(BOOK_BY_ID, async (req, res) => {
  const {body, params} = req;
  const {id} = params;

  if (!body || !Object.keys(body).length) {
    res.status(statusCode.BAD_REQUEST);
    res.send({message: 'No body'});

    return;
  }

  try {
    const repo = booksContainer(BooksRepository);
    const book = await repo.updateBook(id, body);

    res.status(statusCode.OK);
    res.send(book);
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * DELETE - удалить книгу по ID
 */
router.delete(BOOK_BY_ID, async (req, res) => {
  const {id} = params;
  
  try {
    const repo = booksContainer(BooksRepository);
    await repo.deleteBook(id);

    res.status(statusCode.OK);
    res.send({message: 'The book is successfully deleted'});
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * POST - увеличить счетчик просмотра книги по ID
 */
router.post(BOOK_INCREMENT, async (req, res) => {
  const {params} = req;
  const {id} = params;
  const repo = booksContainer(BooksRepository);
  const book = await repo.getBook(id);

  if (!book) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  // counter
  try {
    const viewsCounter = await redisClient.incr(id);
    res.status(statusCode.OK);
    res.send({book, viewsCounter});
  } catch (error) {
    res.status(statusCode.SERVER_ERROR);
    res.send({
      errorStatus: statusCode.SERVER_ERROR,
      errorMessage: `Redis error: ${error.message}`,
    });
  }
});

module.exports = router;
