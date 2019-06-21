import { schema } from 'normalizr';
import entityKeys from './entityKeys';

export const booksSchema = new schema.Entity(entityKeys.books, {});
export const usersSchema = new schema.Entity(entityKeys.users, {
  books: [booksSchema],
});
