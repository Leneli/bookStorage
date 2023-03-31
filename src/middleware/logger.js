const fs = require('fs');
const os = require('os');
const path = require('path');

const logger = (req, res, next) => {
  const now = new Date().toDateString();
  const {url, method} = req;
  const log = `${now}: ${method} ${url}`;
  const logFolder = path.normalize(`${__dirname}/../../logs`);
  const logPath = `${logFolder}/server.log`;

  fs.access(logFolder, fs.constants.R_OK, (err) => {
    if (!err) {
      fs.appendFile(logPath, log + os.EOL, 'utf-8', (err) => {
        if (err) throw err;
      });
    }

    try {
      fs.mkdirSync(logFolder);
      fs.openSync(logPath, 'w');
      fs.appendFileSync(logPath, log + os.EOL, 'utf-8');
    } catch (error) {
      console.error("🚀 ~ file: logger.js:19 ~ fs.access ~ error:", error);
    }
  });

  next();
};

module.exports = {logger};
