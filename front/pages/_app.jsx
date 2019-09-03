import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../component/AppLayout';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';

const _app = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NsWorld</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.css"></link>
            </Head>  
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    );
};

const configureStrote = (initialState, options) => {
    
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configureStrote)(_app);