import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../component/AppLayout';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import PropTypes from 'prop-types';
import reducer from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';

const _app = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NsWorld</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.css"></link>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>  
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    );
};

_app.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};

_app.getInitialProps = async(context) => {
    const { ctx, Component } = context;
    let pageProps = {};
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
}

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