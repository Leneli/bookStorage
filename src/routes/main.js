/**
 * GET - Home page
 */

const express = require('express');
const router = express.Router();

const {MAIN} = require('../constants/endpoints');

router.get(MAIN, (req, res) => {
  const {url, method} = req;
  res.send({
    url,
    method,
  });
});

module.exports = router;
