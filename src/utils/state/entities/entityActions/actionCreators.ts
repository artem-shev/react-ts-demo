import { normalize, schema } from 'normalizr';
import { v4 } from 'uuid';
import { Dispatch } from 'redux';

import * as types from './types';
import firebase from '../../../firebase';

interface EntityActionCreatorConfig {
  entityKey: string;
  schema?: schema.Entity;
}

const firestoreRequest = (requestData: any, meta: any) =>
  firebase.firestore().collection(meta.entityKey);

export const makeApiActions = (config: any = {}) => {
  const {
    processDescriptor = 'FETCHING',
    baseAction = 'FETCH',
    meta,
    transformRequest = (payload: any) => payload,
    transformResponse = (response: any, meta: any) => ({
      processedPayload: response,
      processedMeta: meta,
    }),
    httpService = firestoreRequest,
  } = config;

  return (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: `START_${processDescriptor}`, meta });

    try {
      dispatch({ type: baseAction, meta });

      const data: any = transformRequest(payload, meta);
      const response = await httpService(data, meta);
      const { processedPayload, processedMeta } = transformResponse(response, meta);

      dispatch({
        type: `${baseAction}_SUCCESS`,
        payload: processedPayload,
        meta: { ...meta, ...processedMeta },
      });
    } catch (error) {
      dispatch({
        error,
        meta,
        type: `${baseAction}_FAILED`,
      });
    } finally {
      dispatch({ type: `STOP_${processDescriptor}`, meta });
    }
  };
};

// TODO extract firebase.firestore().collection to config param
export const makeFetchEntityAction = ({
  entityKey,
  schema,
  ...overrides
}: EntityActionCreatorConfig) => {
  return makeApiActions({
    processDescriptor: 'ENTITIES_FETCHING',
    baseAction: types.FETCH_ENTITIES,
    meta: { entityKey },
    httpService: (requestData: any, meta: any) =>
      firestoreRequest(requestData, meta)
        .get()
        .then(snapshots =>
          snapshots.docs
            .map((snapshot: any) => snapshot.data())
            .filter(({ id }: any) => Boolean(id)),
        ),
    transformResponse: (response: any) => {
      // @ts-ignore
      const { entities, result } = normalize(response, [schema]);

      return {
        processedPayload: entities,
        processedMeta: { entityKey, result },
      };
    },
    ...overrides,
  });
};

// TODO extract firebase.firestore().collection to config param
export const makeSaveEntityAction = ({
  entityKey,
  schema,
  ...overrides
}: EntityActionCreatorConfig) => {
  return makeApiActions({
    processDescriptor: 'ENTITIES_FETCHING',
    baseAction: types.SAVE_ENTITY,
    meta: { entityKey },
    transformRequest: ({ id, ...rest }: any) => ({ ...rest, id: id || v4() }),
    httpService: (requestData: any, meta: any) =>
      firestoreRequest(requestData, meta)
        .doc(requestData.id)
        .set(requestData)
        .then(() => requestData),
    transformResponse: (entity: any) => {
      // @ts-ignore
      const { entities, result } = normalize(entity, schema);

      return {
        processedPayload: entities,
        processedMeta: { entityKey, result },
      };
    },
    ...overrides,
  });
};

export const makeDeleteEntityAction = ({ entityKey, ...overrides }: EntityActionCreatorConfig) => {
  return makeApiActions({
    processDescriptor: 'ENTITIES_FETCHING',
    baseAction: types.DELETE_ENTITY,
    meta: { entityKey },
    httpService: (id: any, meta: any) =>
      firestoreRequest(id, meta)
        .doc(id)
        .delete()
        .then(() => id),
    transformResponse: (id: any) => ({
      processedPayload: id,
      processedMeta: { entityKey },
    }),
    ...overrides,
  });
};
