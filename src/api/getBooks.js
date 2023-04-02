const {getStore} = require('../store');

const getBooks = (id) => {
  const store = getStore();

  if (id) {
    const book = store.books.find((item) => item.id === id);

    return book;
  }

  return store.books || [];
};

module.exports = {
  getBooks,
};
