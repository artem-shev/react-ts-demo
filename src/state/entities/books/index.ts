import { makeGetEntities } from 'utils/state/entities/selectorCreators';
import {
  makeFetchEntityAction,
  makeSaveEntityAction,
  makeDeleteEntityAction,
} from 'utils/state/entities/entityActions/actionCreators';

import entityKeys from '../entityKeys';
import { booksSchema } from '../schemas';

const config = {
  entityKey: entityKeys.books,
  schema: booksSchema,
};

export const booksActions = {
  fetch: makeFetchEntityAction(config),
  save: makeSaveEntityAction(config),
  delete: makeDeleteEntityAction(config),
};

export const booksSelectors = {
  getBooks: makeGetEntities(entityKeys.books, booksSchema),
};
