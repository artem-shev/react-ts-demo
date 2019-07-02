import { createSelector } from 'reselect';
import { pick, get } from 'lodash';
import { denormalize, schema } from 'normalizr';

export const makeGetState = (path = '') => {
  return (state: any) => get(state, path, state);
};

export const getEntities = (entityKey: string, schema: schema.Entity) => {
  const getEntities = makeGetState(`entities`);
  const getResult = makeGetState(`meta.${entityKey}.result`);

  return createSelector(
    getEntities,
    getResult,
    (entities, result) => denormalize(result, schema, entities),
  );
};

export const makeGetStateProps = (stateSelector: (arg0: any) => any, ...props: string[]) => {
  const selector =
    props.length > 1 ? (state: any) => pick(state, props) : (state: any) => state[props[0]];
  return createSelector(
    stateSelector,
    selector,
  );
};
