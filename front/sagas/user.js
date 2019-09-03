import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI(){

}
function* login(){
    try {
        yield call(loginAPI);
        yield put({
            type : LOG_IN_SUCCESS,
        })
    } catch (error) {
        console.error(e);
        yield put({
            type : LOG_IN_FAILURE,
        })
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignUp(){

}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
}