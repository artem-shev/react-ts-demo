import { combineReducers } from 'redux';
import entitiesReducer, { moduleName as entitiesModuleName } from './entities';
import metaReducer, { moduleName as metaModuleName } from './meta';

const rootReducer = combineReducers({
  [metaModuleName]: metaReducer,
  [entitiesModuleName]: entitiesReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
