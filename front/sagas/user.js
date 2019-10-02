import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
  } from '../reducers/user';

function loginAPI(loginData) {
        // 서버에 요청을 보내는 부분
        return axios.post('/user/login', loginData, {
            withCredentials: true,  //cookie를 주고 받기 위한 설정
        });
    }
    
    function* login(action) {
        try {
            const result = yield call(loginAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: LOG_IN_SUCCESS,
                data: result.data
            });
        } catch (e) { // loginAPI 실패
            console.error(e);
            yield put({
                type: LOG_IN_FAILURE,
            });
        }
    }
    
    function* watchLogin() {
        yield takeEvery(LOG_IN_REQUEST, login);
    }
    
    function signUpAPI(signUpData) {
        // 서버에 요청을 보내는 부분
        return axios.post('/user', signUpData);
    }
    
    function* signUp(action) {
        try {
            yield call(signUpAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: SIGN_UP_SUCCESS,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: SIGN_UP_FAILURE,
                error: e,
            });
        }
    }
  
    function* watchSignUp() {
        yield takeEvery(SIGN_UP_REQUEST, signUp);
    }

    function logoutAPI() {
        // 서버에 요청을 보내는 부분
        return axios.post('/user/logout', {}, {
            withCredentials: true,  //cookie를 주고 받기 위한 설정
        });
    }
    
    function* logout() {
        try {
            yield call(logoutAPI);
            yield put({ // put은 dispatch 동일
                type: LOG_OUT_SUCCESS,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: LOG_OUT_FAILURE,
                error: e,
            });
        }
    }
  
    function* watchLogout() {
        yield takeEvery(LOG_OUT_REQUEST, logout);
    }

    function loadUserAPI() {
        // 서버에 요청을 보내는 부분
        return axios.get('/user', {
            withCredentials: true
        });
    }
    
    function* loadUser() {
        try {
            const result = yield call(loadUserAPI);
            yield put({ // put은 dispatch 동일
                type: LOAD_USER_SUCCESS,
                data: result.data
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: LOAD_USER_FAILURE,
                error: e,
            });
        }
    }

    function* watchLoadUser() {
        yield takeEvery(LOAD_USER_REQUEST, loadUser);
    }

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchSignUp),
    ]);
}