import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../component/AppLayout';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';

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

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares), 
        !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(_app);