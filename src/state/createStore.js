import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import reducers from '../redux/reducers';

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({ collapsed: true }));
}

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const createStore = () => reduxCreateStore(reducers, enhancer);
export default createStore;
