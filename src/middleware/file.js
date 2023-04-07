const {Buffer} = require('node:buffer');
const multer = require('multer');

const config = require('../../config');

const storage = multer.diskStorage({
  destination: config.public_books_dir,

  filename: (req, file, callback) => {
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');

    callback(null, `${new Date().toISOString()}-${fileName}`);
  },
});

module.exports = multer({storage});
