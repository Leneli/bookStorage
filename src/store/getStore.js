const fs = require('fs');
const path = require('path');

const config = require('../../config');

const getStore = () => {
  let store = {
    books: [],
  };
  const folderPath = path.normalize(`${__dirname}/${config.store_dir_name}`);
  const filePath = `${folderPath}/${config.store_books_list_file_name}`;

  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (!err) {
      try {
        const jsonString = fs.readFileSync(filePath, 'utf-8') || '{}';
        store = JSON.parse(jsonString);
      } catch (error) {
        console.error("🚀 ~ file: getStore.js:19 ~ fs.access ~ error:", error);
      }
    } else {
      try {
        fs.mkdirSync(folderPath);
        fs.openSync(filePath, 'w');
        fs.appendFileSync(filePath, JSON.stringify(store, null, '  '), 'utf-8');
      } catch (error) {
        console.error("🚀 ~ file: getStore.js:26 ~ fs.access ~ error:", error, err);
      }
    }
  });

  return store;
};

module.exports = {
  getStore,
};
