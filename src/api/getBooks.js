const BookModel = require('../models/bookModel');

const getBooks = async (id) => {
  try {
    if (id) {
      const book = await BookModel.findById(id).select('-__v');
      return book;
    }

    const books = await BookModel.find().select('-__v');
    return books;
  } catch (error) {
    console.log("🚀 ~ file: getBooks.js:13 ~ getBooks ~ error:", error);
  }
};

module.exports = {
  getBooks,
};
