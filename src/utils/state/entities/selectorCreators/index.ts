import { denormalize, schema } from 'normalizr';
import { createSelector } from 'reselect';

export const makeGetEntities = (entityKey: string, schema: schema.Entity) =>
  createSelector(
    (state: any) => state.entities,
    (state: any) => state.meta[entityKey].result,
    (entities, result) => denormalize(result, [schema], entities),
  );
