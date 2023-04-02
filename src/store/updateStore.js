const fs = require('fs');

const config = require('../../config');
const initStore = require('./initStore');

const updateStore = (updatedStore = initStore) => {
  console.log("🚀 ~ Booking storage update... ", config.store_books_path);

  try {
    const storeStringify = JSON.stringify(updatedStore, null, '  ');

    fs.writeFileSync(config.store_books_path, storeStringify, 'utf-8');

    console.log("🚀 ~ Booking storage updated successfully!");
  } catch (error) {
    console.log("🚀 ~ file: updateStore.js:16 ~ updateStore ~ Booking storage update error:", error);
  }
}

module.exports = {
  updateStore,
};