import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import AppLayout from '../component/AppLayout';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import PropTypes from 'prop-types';
import reducer from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';
import Axios from 'axios';

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

_app.getInitialProps = async(context) => {  //getInitialProps는 page에서만 사용가능 //context는 next에서 내려주는것 //getInitialProps도 라이프사이클인데 제일 먼저 실행됨(랜더링전)
    const { ctx, Component } = context; //commponent는 각 pages
    let pageProps = {};

    const state = ctx.store.getState(); //store안에 데이터도 가져올수있음.
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';  //context안에 쿠키 정보가 있음
    if(ctx.isServer && cookie){
        Axios.defaults.headers.cookie = cookie; //SSR시 axios에다가 쿠키를 직접넣어줘야함. 클라이언트일때 withCredential은 블라우저가 쿠키를 넣어주는데 SSR시 브라우저는 역활이 없기때문에 직접 넣어야함.
    }
    if(!state.user.me){
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        })
    }
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);   //각 pages에 있는 getInitialProps 를 실행 (랜더링전)
    }

    return { pageProps };
}

const configureStrote = (initialState, options) => {
    
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => { //리덕스 사가에서 에러를 찾기위해 커스텀 미들웨어를 추가(생성하는 방식 기억하삼.)
        next(action);
    }];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configureStrote)(withReduxSaga(_app));