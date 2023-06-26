import express from 'express';

import {BooksRepository} from '../entities/BooksRepository';
import {fileMulter} from '../middleware';
import {redisClient} from '../store';
import {booksContainer} from '../IoC/container';
import {ENDPOINTS, RESPONSE_STATUS} from '../constants';

const router = express.Router();
const {LOGIN, BOOKS, BOOK_BY_ID, BOOK_DOWNLOAD, BOOK_INCREMENT} = ENDPOINTS;

/**
 * POST - авторизация пользователя
 */
router.post(LOGIN, (req: any, res: any) => {
  res.status(RESPONSE_STATUS.CREATED);
  res.send({ id: 1, mail: "test@mail.ru" });
});

/**
 * GET - получить все книги
 */
router.get(BOOKS, async (req: any, res: any) => {
  try {
    const repo = booksContainer(BooksRepository);
    const books = await repo.getBooks();
  
    res.status(RESPONSE_STATUS.OK);
    res.send(books);
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * GET - получить книгу по ID
 */
router.get(BOOK_BY_ID, async (req: any, res: any) => {
  const {id} = req.params;

  try {
    const repo = booksContainer(BooksRepository);
    const book = await repo.getBook(id);

    if (book) {
      res.status(RESPONSE_STATUS.OK);
      res.send(book);
    } else {
      res.status(RESPONSE_STATUS.NOT_FOUND);
      res.send({message: 'Book not found'});
    }
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * POST - создать книгу
 */
router.post(BOOKS, fileMulter.single('fileBook'), async (req: any, res: any) => {
  const {body} = req;

  if (!body) {
    res.status(RESPONSE_STATUS.BAD_REQUEST);
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

      res.status(RESPONSE_STATUS.CREATED);
      res.send(newBook);
    } catch (error) {
      res.status(RESPONSE_STATUS.BAD_REQUEST);
      res.send(error);
    }

    return;
  }

  res.status(RESPONSE_STATUS.BAD_REQUEST);
  res.send({
    isError: true,
    statusCode: RESPONSE_STATUS.BAD_REQUEST,
    errorMessage: 'Incorrect body',
  });
});

/**
 * GET - скачать книгу
 */
router.get(BOOK_DOWNLOAD, async (req: any, res: any) => {
  const {params} = req;
  const {id} = params;
  const repo = booksContainer(BooksRepository);
  const book = await repo.getBook(id);

  if (!book) {
    res.status(RESPONSE_STATUS.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  try {
    res.download(book.fileBook, book.fileBookOriginalName);
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send({message: `Unable to download file by ID ${id}`});
  }
});

/**
 * PUT - редактировать книгу по ID
 */
// TODO: PUT method from form
router.post(BOOK_BY_ID, async (req: any, res: any) => {
  const {body, params} = req;
  const {id} = params;

  if (!body || !Object.keys(body).length) {
    res.status(RESPONSE_STATUS.BAD_REQUEST);
    res.send({message: 'No body'});

    return;
  }

  try {
    const repo = booksContainer(BooksRepository);
    const book = await repo.updateBook(id, body);

    res.status(RESPONSE_STATUS.OK);
    res.send(book);
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * DELETE - удалить книгу по ID
 */
router.delete(BOOK_BY_ID, async (req: any, res: any) => {
  const {params} = req;
  const {id} = params;
  
  try {
    const repo = booksContainer(BooksRepository);
    await repo.deleteBook(id);

    res.status(RESPONSE_STATUS.OK);
    res.send({message: 'The book is successfully deleted'});
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send(error);
  }
});

/**
 * POST - увеличить счетчик просмотра книги по ID
 */
router.post(BOOK_INCREMENT, async (req: any, res: any) => {
  const {params} = req;
  const {id} = params;
  const repo = booksContainer(BooksRepository);
  const book = await repo.getBook(id);

  if (!book) {
    res.status(RESPONSE_STATUS.NOT_FOUND);
    res.send({message: 'Book not found'});

    return;
  }

  // counter
  try {
    const viewsCounter = await redisClient.incr(id);
    res.status(RESPONSE_STATUS.OK);
    res.send({book, viewsCounter});
  } catch (error) {
    res.status(RESPONSE_STATUS.SERVER_ERROR);
    res.send({
      errorStatus: RESPONSE_STATUS.SERVER_ERROR,
      errorMessage: `Redis error: ${(error as Error).message}`,
    });
  }
});

export {router};
