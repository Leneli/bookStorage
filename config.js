const path = require('path');

const logFolder = path.normalize(`${__dirname}/logs`);
const logFileName = 'server.log';
const logPath = `${logFolder}/${logFileName}`;
const storeFolderPath = path.normalize(`${__dirname}/books`);
const storeFileName = 'books.json';
const storeFilePath = `${storeFolderPath}/${storeFileName}`;

module.exports = {
  port: process.env.PORT || 3000,
  logs_dir_name: logFolder,
  logs_file_name: logFileName,
  logs_path: logPath,
  store_dir_name: storeFolderPath,
  store_books_list_file_name: storeFileName,
  store_books_path: storeFilePath,
}
