/**
 * GET - Home page
 */

const express = require('express');
const router = express.Router();

const config = require('../../config');

const {MAIN} = require('../constants/endpoints');
const navigation = require('../constants/siteNav');

router.get(MAIN, (req, res) => {
  res.render('index', {
    metaTitle: `${config.site_name} | Home page`,
    title: config.site_name,
    navigation,
    currentUrl: navigation[0].url,
  });
});

router.get('/add-book', (req, res) => {
  res.render('add-book/index', {
    metaTitle: `${config.site_name} | Add book page`,
    title: config.site_name,
    navigation,
    currentUrl: navigation[1].url,
  });
});

module.exports = router;
