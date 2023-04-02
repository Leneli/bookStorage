const fs = require('fs');
const os = require('os');

const config = require('../../config');

const logger = (req, res, next) => {
  const now = new Date().toDateString();
  const {url, method} = req;
  const log = `${now}: ${method} ${url}`;

  fs.access(config.logs_dir_name, fs.constants.R_OK, (err) => {
    if (!err) {
      fs.appendFile(config.logs_path, log + os.EOL, 'utf-8', (err) => {
        if (err) throw err;
      });
    } else {
      try {
        fs.mkdirSync(config.logs_dir_name);
        fs.openSync(config.logs_path, 'w');
        fs.appendFileSync(config.logs_path, log + os.EOL, 'utf-8');
      } catch (error) {
        console.error("🚀 ~ file: logger.js:27 ~ fs.access ~ error:", error);
      }
    }
  });

  next();
};

module.exports = {logger};
