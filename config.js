const path = require('path');

const publicFolder = path.normalize(`${__dirname}/public`);
const cssFolder = path.normalize(`${__dirname}/css`);
const logFolder = path.normalize(`${__dirname}/logs`);
const logFileName = 'server.log';
const logPath = `${logFolder}/${logFileName}`;
const storeFolderPath = path.normalize(`${__dirname}/books`);
const storeFileName = 'books.json';
const storeFilePath = `${storeFolderPath}/${storeFileName}`;

module.exports = {
  site_name: 'Books Storage',
  port: process.env.PORT || 3000,
  redis_url: process.env.REDIS_URL || 'redis://localhost',
  logs_dir_name: logFolder,
  logs_file_name: logFileName,
  logs_path: logPath,
  store_dir_name: storeFolderPath,
  store_books_list_file_name: storeFileName,
  store_books_path: storeFilePath,
  public_dir: publicFolder,
  public_books_dir: `${publicFolder}/books`,
  css_folder: cssFolder,
}
