import {
  makeDeleteEntityAction,
  makeFetchEntityAction,
  makeSaveEntityAction,
} from 'utils/state/entities/entityActions/actionCreators';
import { makeGetEntities } from 'utils/state/entities/selectorCreators';

import entityKeys from '../entityKeys';
import { usersSchema } from '../schemas';

const config = {
  entityKey: entityKeys.users,
  schema: usersSchema,
};

export default {
  selectors: {
    getEntities: makeGetEntities(entityKeys.users, usersSchema),
  },
  actions: {
    fetch: makeFetchEntityAction(config),
    save: makeSaveEntityAction(config),
    delete: makeDeleteEntityAction(config),
  },
};
