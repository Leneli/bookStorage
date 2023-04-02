const fs = require('fs');

const config = require('../../config');
const initStore = require('./initStore');

const createStore = () => {
  fs.access(config.store_books_path, fs.constants.R_OK, (err) => {
    console.log("🚀 ~ Looking for storage file:", config.store_books_path);

    if (err) {
      console.log("🚀 ~ Books storage is created...");

      try {
        fs.mkdirSync(config.store_dir_name);
        fs.openSync(config.store_books_path, 'w');
        fs.appendFileSync(config.store_books_path, JSON.stringify(initStore, null, '  '), 'utf-8');

        console.log("🚀 ~ ...storage created successfully!");
      } catch (error) {
        console.error("🚀 ~ file: getStore.js:29 ~ fs.access ~ error:", error, err);
      }
    } else {
      console.log("🚀 ~ Books storage already created");
    }
  });
};

module.exports = {
  createStore,
};
