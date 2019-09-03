const dummyUser = {
    nickname : '이남수',
    Post : [],
    Followings : [],
    Followers : [],
}

export const initialState = {
    isLoggedIn : false,
    user : null,
    signUpData : {},
    isLodding : false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const loginAction = {
    type : LOG_IN_REQUEST,
    data : {
        nickname : '이남수'
    }
}

export const logoutAction = {
    type : LOG_OUT_REQUEST,
}

export const signUpAction = (data) => {
    return {
        type: SIGN_UP_REQUEST,
        data: data
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return{
                ...state,
                isLodding : true,
            }
        case LOG_IN_SUCCESS:
            return{
                ...state,
                isLoggedIn : true,
                user : dummyUser,
                isLodding : false,
            }
        case LOG_OUT_SUCCESS:
            return{
                ...state,
                isLoggedIn : false,
                user : null
            }
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpData : action.data
            }
        default:
            return {
                ...state,
            }
    } 
}

export default reducer;