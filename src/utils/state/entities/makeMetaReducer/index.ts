import { get, uniq } from 'lodash';
import { AnyAction } from 'redux';
import * as types from '../entityActions/types';

export const defaultMetaState = {
  isFetching: false,
  result: [],
};

export default (config: { entityKey: string; initialState?: Object }) => {
  const { entityKey, initialState = defaultMetaState } = config;

  return function entityReducer(state: any = initialState, { type, meta, payload }: AnyAction) {
    if (get(meta, 'entityKey') !== entityKey) return state;

    switch (type) {
      case types.START_ENTITIES_FETCHING:
        return { ...state, isFetching: true };

      case types.STOP_ENTITIES_FETCHING:
        return { ...state, isFetching: false };

      case types.FETCH_ENTITIES_SUCCESS:
        return { ...state, result: meta.result };

      case types.SAVE_ENTITY_SUCCESS:
        return { ...state, result: uniq([...state.result, meta.result]) };

      case types.DELETE_ENTITY_SUCCESS:
        return { ...state, result: state.result.filter((id: string) => id !== payload) };

      default:
        return state;
    }
  };
};
