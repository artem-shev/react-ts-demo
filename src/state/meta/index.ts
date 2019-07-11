import { combineReducers } from 'redux';
import { mapValues } from 'lodash';
import makeMetaReducer from '../../utils/state/entities/makeMetaReducer';
import entityKeys from '../entities/entityKeys';

export const moduleName = 'meta';

export default combineReducers(mapValues(entityKeys, entityKey => makeMetaReducer({ entityKey })));
