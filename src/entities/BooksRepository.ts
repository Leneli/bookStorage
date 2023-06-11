abstract class BooksRepository {
  protected books: IBook[];

  constructor(books: IBook[]) {
    this.books = books;
  }

  /**
   * создание книги
   * @param {IBook} book
   */
  abstract createBook(book: IBook): void;

  /**
   * обновление книги
   * @param {string} id
   */
  abstract updateBook(id: string): void;

  /**
   * получение книги по id
   * @param {string} id
   * @returns IBook | undefined
   */
  getBook(id: string): IBook | undefined {
    return this._searchBookById(id);
  }

  /**
   * получение всех книг
   * @returns IBook[]
   */
  getBooks(): IBook[] {
    return this.books;
  }

  /**
   * удаление книги
   * @param {string} id
   */
  deleteBook(id: string): void {
    this.books = this.books.filter((item) => item.id !== id);
  }

  private _searchBookById(id: string): IBook | undefined {
    return this.books.find((item) => item.id === id);
  }
}

module.exports = {BooksRepository};
