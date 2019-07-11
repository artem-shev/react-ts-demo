import { AnyAction } from 'redux';
import { has, omit } from 'lodash';
import * as types from '../entityActions/types';

export const defaultEntityState = {};

const mergeEntitiesWithPayload = (state: any, entities: any) => {
  return Object.entries(entities).reduce(
    (acc, [id, entity]) => ({
      ...acc,
      [id]: {
        ...(state[id] || {}),
        ...entity,
      },
    }),
    state,
  );
};

export default ({
  entityKey,
  initialState = defaultEntityState,
}: {
  entityKey: string;
  initialState?: Object;
}) =>
  function entityReducer(state = initialState, { type, payload, meta }: AnyAction) {
    if (!has(payload, entityKey)) return state;

    switch (type) {
      case types.FETCH_ENTITIES_SUCCESS:
      case types.SAVE_ENTITY_SUCCESS:
        return mergeEntitiesWithPayload(state, payload[entityKey]);

      case types.DELETE_ENTITY_SUCCESS:
        return omit(state, payload);

      default:
        return state;
    }
  };
