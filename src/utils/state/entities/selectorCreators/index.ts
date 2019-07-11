import { denormalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import { get } from 'lodash';

export const makeGetEntities = (entityKey: string, schema: schema.Entity) =>
  createSelector(
    (state: any) => get(state, 'entities'),
    (state: any) => get(state, `meta.${entityKey}.result`, []),
    (entities, result) => denormalize(result, [schema], entities),
  );
