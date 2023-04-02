const multer = require('multer');

const config = require('../../config');

const storage = multer.diskStorage({
  destination: config.public_books_dir,

  filename: (req, file, callback) => {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

module.exports = multer({storage});
