const fs = require('fs');

const config = require('../../config');
const initStore = require('./initStore');

const getStore = () => {
  let store = {...initStore};

  console.log("🚀 ~ Read books storage from file ", config.store_books_path);

  try {
    const storeFile = fs.readFileSync(config.store_books_path, 'utf-8');
    !!storeFile && (store = JSON.parse(storeFile));

    console.log("🚀 ~ File read successfully!");
  } catch (error) {
    console.log("🚀 ~ file: getStore.js:17 ~ getStore ~ File read error: ", error);
  }

  return store;
};

module.exports = {
  getStore,
};
