import {BookModel} from '../models/bookModel';

export class BooksRepository {
  protected books: IBook[];

  constructor(books: IBook[]) {
    this.books = books;
  }

  /**
   * создание книги
   * @param {IBook} book
   */
  async createBook (book: IBook) {
    try {
      const newBook = new BookModel(book);

      await newBook.save();

      return newBook;
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  /**
   * обновление книги
   * @param {string} id
   */
  async updateBook (id: string, book: IBook) {
    try {
      const foundBook = await BookModel.findById(id).select('-__v');

      await foundBook?.update(book);

      return foundBook;
    }  catch (error) {
      console.error((error as Error).message);
    }
  }

  /**
   * получение книги по id
   * @param {string} id
   * @returns IBook | undefined
   */
  async getBook (id: string) {
    try {
      return await BookModel.findById(id).select('-__v');
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  /**
   * получение всех книг
   * @returns IBook[]
   */
  async getBooks () {
    try {
      return await BookModel.find().select('-__v')
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  /**
   * удаление книги
   * @param {string} id
   */
  async deleteBook (id: string) {
    try {
      await BookModel.deleteOne({ _id: id });
    } catch (error) {
      console.error((error as Error).message);
    }
  }
}
