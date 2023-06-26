import {BookModel} from './../models/bookModel.js'

export const getBooks = async (id?: string) => {
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
