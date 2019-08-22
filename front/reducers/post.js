export const initialState = {
    imagePaths : [],
    mainPosts : [{
        User : {
            id : 1,
            nickname : '이남수',
        },
        content : '첫게시물',    
        img : '../img/190622_0467.jpg',
        createdAt : 1,
    },
    {
        User : {
            id : 2,
            nickname : '이남수',
        },
        content : '두번째게시물',    
        img : '../img/190622_0467.jpg',
        createdAt : 2,
    }]
}

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
    type : ADD_POST
}
const addDummy = {
    type : ADD_DUMMY,
    data : {
        content : 'Hello',
        UserId : 1,
        User : {
            nickname : '이남수',
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state
            }
        case ADD_DUMMY:
            return{
                ...state,
                mainPost : [...state.mainPost, action.data]
            }
    
        default:
            return {
                ...state,
            }
    }
}

export default reducer;