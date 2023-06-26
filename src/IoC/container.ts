import 'reflect-metadata';
import {Container} from 'inversify';
import {BooksRepository} from '../entities/BooksRepository';

const booksContainer = new Container();

booksContainer.bind(BooksRepository).toSelf();

export {booksContainer};
