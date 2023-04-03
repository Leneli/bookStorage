const { v4: uuid } = require('uuid');

module.exports = class Book {
  constructor({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
    fileBookOriginalName,
  }) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover,
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.fileBookOriginalName = fileBookOriginalName;
  }
};
