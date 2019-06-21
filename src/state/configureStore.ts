import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';

interface State {}

export default function configureStore(preloadedState?: State, reducer = rootReducer) {
  const middlewares = [thunkMiddleware];
  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  return createStore(reducer, preloadedState, enhancers);
}
