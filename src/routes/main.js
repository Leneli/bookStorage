/**
 * GET - Home page
 */

const express = require('express');
const router = express.Router();

const config = require('../../config');

const {getBooks} = require('../api');

const {MAIN, PAGE_ADD_BOOK, PAGE_BOOK, PAGE_EDIT_BOOK} = require('../constants/endpoints');
const navigation = require('../constants/siteNav');

router.get(MAIN, (req, res) => {
  const books = getBooks();

  res.render('index', {
    metaTitle: `${config.site_name} | Home page`,
    title: config.site_name,
    books,
    navigation,
    currentUrl: MAIN,
  });
});

router.get(PAGE_BOOK, (req, res) => {
  const {id} = req.params;
  const books = getBooks();
  const book = books.find((item) => item.id === id);

  res.render('book/index', {
    metaTitle: `${config.site_name} | Book page`,
    title: config.site_name,
    book,
    navigation,
    currentUrl: PAGE_BOOK,
  });
});

router.get(PAGE_ADD_BOOK, (req, res) => {
  res.render('add-book/index', {
    metaTitle: `${config.site_name} | Add book page`,
    title: config.site_name,
    navigation,
    currentUrl: PAGE_ADD_BOOK,
  });
});

router.get(PAGE_EDIT_BOOK, (req, res) => {
  const {id} = req.params;
  const books = getBooks();
  const book = books.find((item) => item.id === id);

  res.render('edit-book/index', {
    metaTitle: `${config.site_name} | Edit book page`,
    title: config.site_name,
    navigation,
    currentUrl: PAGE_EDIT_BOOK,
    book,
  });
});

module.exports = router;
