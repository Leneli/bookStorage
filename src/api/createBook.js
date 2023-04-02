const {getStore, updateStore} = require('../store');
const statusCode = require('../constants/responseStatusCode');

const createBook = (book) => {
  const store = getStore();
  const result = {
    statusCode: statusCode.CREATED,
    message: 'Ok',
  };

  try {
    store.books.push(book);
    updateStore(store);
  } catch (error) {
    console.error("🚀 ~ file: createBook.js:16 ~ createBook ~ error:", error);

    result.statusCode = statusCode.SERVER_ERROR;
    result.message = error?.message || 'Failed';
  }

  return result;
};

module.exports = {
  createBook,
};