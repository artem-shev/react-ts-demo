import { combineReducers } from 'redux';
import { mapValues } from 'lodash';

import makeEntityReducer from '../../utils/state/entities/makeEntityReducer';
import entityKeys from './entityKeys';

export const moduleName = 'entities';

export default combineReducers(
  mapValues(entityKeys, entityKey => makeEntityReducer({ entityKey })),
);
