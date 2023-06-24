import express from 'express';

import {redisClient} from '../store';
import {CONFIG} from '../config';
import {getBooks} from '../api';
import {ENDPOINTS, SINE_NAVIGATION} from '../constants';

const router = express.Router();
const {MAIN, PAGE_ADD_BOOK, PAGE_BOOK, PAGE_EDIT_BOOK, ERROR_NOT_FOUND} = ENDPOINTS;

router.get(MAIN, (req: any, res: any) => {
  const books = getBooks();

  res.render('index', {
    metaTitle: `${CONFIG.site_name} | Home page`,
    title: CONFIG.site_name,
    books,
    navigation: SINE_NAVIGATION,
    currentUrl: MAIN,
  });
});

router.get(PAGE_BOOK, async (req: any, res: any) => {
  const {id} = req.params;
  const books = await getBooks();
  const book = books?.find((item: any) => item.id === id);
  let viewsCounter = 0;

  if (!book) res.redirect('/404');

  // counter
  try {
    viewsCounter = await redisClient.incr(id);
  } catch (error) {
    console.log(`🚀 ~ Redis error: ${(error as Error).message}`);
  }

  res.render('book/index', {
    metaTitle: `${CONFIG.site_name} | Book page`,
    title: CONFIG.site_name,
    book,
    viewsCounter,
    navigation: SINE_NAVIGATION,
    currentUrl: PAGE_BOOK,
  });
});

router.get(PAGE_ADD_BOOK, (req: any, res: any) => {
  res.render('add-book/index', {
    metaTitle: `${CONFIG.site_name} | Add book page`,
    title: CONFIG.site_name,
    navigation: SINE_NAVIGATION,
    currentUrl: PAGE_ADD_BOOK,
  });
});

router.get(PAGE_EDIT_BOOK, async (req: any, res: any) => {
  const {id} = req.params;
  const books = await getBooks();
  const book = books?.find((item: any) => item.id === id);

  if (!book) res.redirect('/404');

  res.render('edit-book/index', {
    metaTitle: `${CONFIG.site_name} | Edit book page`,
    title: CONFIG.site_name,
    navigation: SINE_NAVIGATION,
    currentUrl: PAGE_EDIT_BOOK,
    book,
  });
});

router.get(ERROR_NOT_FOUND, (req: any, res: any) => {
  res.render('error/404', {
    metaTitle: `${CONFIG.site_name} | Error page`,
    title: CONFIG.site_name,
    navigation: SINE_NAVIGATION,
    currentUrl: ERROR_NOT_FOUND,
  });
});

export {router};
