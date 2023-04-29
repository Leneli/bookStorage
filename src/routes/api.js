const express = require('express');
const router = express.Router();

const {fileMulter} = require('../middleware');

const {getBooks, createBook} = require('../api');
const {getStore, redisClient} = require('../store');

const {LOGIN, BOOKS, BOOK_BY_ID, BOOK_DOWNLOAD, BOOK_INCREMENT} = require('../constants/endpoints');
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
router.post(BOOKS, fileMulter.single('fileBook'), (req, res) => {
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
    const book  = new Book({
      title: bookTitle,
      description,
      authors,
      favorite,
      fileCover,
      fileName: fileBookName,
      fileBook: fileBookPath,
      fileBookOriginalName,
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
 * GET - скачать книгу
 */
router.get(BOOK_DOWNLOAD, (req, res) => {
  const {params} = req;
  const {id} = params;
  const book = getBooks(id);

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
router.post(BOOK_BY_ID, (req, res) => {
  const store = getStore();
  const {body, params} = req;
  const {id} = params;

  if (!body || !Object.keys(body).length) {
    res.status(statusCode.BAD_REQUEST);
    res.send({message: 'No body'});

    return;
  }

  let book = getBooks(id);

  if (!book) {
    res.status(statusCode.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  book = {...book, ...body, favorite: body.favorite || false};

  const updatedStore = {...store};

  updatedStore.books = [book, ...store.books?.filter((item) => item.id !== book.id)]
  updateStore(updatedStore);

  res.status(statusCode.OK);
  res.send(book);
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

  // TODO: Delete book from store
  // books.splice(bookIndex, 1);

  res.status(statusCode.OK);
  res.send({message: 'The book is successfully deleted'})
});

/**
 * POST - увеличить счетчик просмотра книги по ID
 */
router.post(BOOK_INCREMENT, async (req, res) => {
  const {params} = req;
  const {id} = params;

  const book = getBooks(id);

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
