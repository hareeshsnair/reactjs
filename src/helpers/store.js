import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const initialState = {};

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
    middlewares.push(loggerMiddleware);
}

export const store = createStore(
    rootReducer, 
    initialState, 
    compose (
        applyMiddleware(...middlewares),
        /* Enable this if you have installed redux dev tools chrome extension */
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
