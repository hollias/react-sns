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
    FOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_SUCCESS,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    EDIT_NICKNAME_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE,
  } from '../reducers/user';

function loginAPI(loginData) {
        // 서버에 요청을 보내는 부분
        return axios.post('/user/login', loginData, {
            withCredentials: true,  //cookie를 주고 받기 위한 설정  //클라이언트에서 요청을 보낼때는 블라우저가 쿠키를 같이 동봉해줌
        });                                                         //서버사이드랜더링일 때는 브라우져가 없음 그래서 내가 넣어야함.
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

    function loadUserAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.get(userId ? `/user/${userId}` : '/user', {
            withCredentials: true
        });
    }
    
    function* loadUser(action) {
        try {
            const result = yield call(loadUserAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: LOAD_USER_SUCCESS,
                data: result.data,
                me : !action.data
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

    function followUserAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.post(`/user/${userId}/follow`, {}, {
            withCredentials: true
        });
    }
    
    function* followUser(action) {
        try {
            const result = yield call(followUserAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: FOLLOW_USER_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: FOLLOW_USER_FAILURE,
                error: e,
            });
        }
    }

    function* watchFollowUser() {
        yield takeEvery(FOLLOW_USER_REQUEST, followUser);
    }

    function unfollowUserAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.delete(`/user/${userId}/unfollow`, {
            withCredentials: true
        });
    }
    
    function* unfollowUser(action) {
        try {
            const result = yield call(unfollowUserAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: UNFOLLOW_USER_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: UNFOLLOW_USER_FAILURE,
                error: e,
            });
        }
    }

    function* watchUnfollowUser() {
        yield takeEvery(UNFOLLOW_USER_REQUEST, unfollowUser);
    }

    function loadFollowersAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.get(`/user/${userId || 0}/followers`, {
            withCredentials: true
        });
    }
    
    function* loadFollowers(action) {
        try {
            const result = yield call(loadFollowersAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: LOAD_FOLLOWINGS_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: LOAD_FOLLOWERS_FAILURE,
                error: e,
            });
        }
    }

    function* watchLoadFollowers() {
        yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
    }

    function loadFollowingsAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.get(`/user/${userId || 0}/followings`, {
            withCredentials: true
        });
    }
    
    function* loadFollowings(action) {
        try {
            const result = yield call(loadFollowingsAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: LOAD_FOLLOWINGS_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: LOAD_FOLLOWINGS_FAILURE,
                error: e,
            });
        }
    }

    function* watchLoadFollowings() {
        yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
    }

    function removeFollowerAPI(userId) {
        // 서버에 요청을 보내는 부분
        return axios.delete(`/user/${userId}/follower`, {
            withCredentials: true
        });
    }
    
    function* removeFollower(action) {
        try {
            const result = yield call(removeFollowerAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: REMOVE_FOLLOWER_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: REMOVE_FOLLOWER_FAILURE,
                error: e,
            });
        }
    }

    function* watchRemoveFollower() {
        yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
    }

    function editNicknameAPI(nickname) {
        // 서버에 요청을 보내는 부분
        return axios.patch(`/user/nickname`, { nickname }, {
            withCredentials: true
        });
    }
    
    function* editNickname(action) {
        try {
            const result = yield call(editNicknameAPI, action.data);
            yield put({ // put은 dispatch 동일
                type: EDIT_NICKNAME_SUCCESS,
                data: result.data,
            });
        } catch (e) { 
            console.error(e);
            yield put({
                type: EDIT_NICKNAME_FAILURE,
                error: e,
            });
        }
    }

    function* watchEditNickname() {
        yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
    }

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollowUser),
        fork(watchUnfollowUser),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}