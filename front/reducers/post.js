import produce from 'immer'; //불변성을 보장해주는 모듈

export const initialState = {
    mainPosts: [], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, // 포스트 업로드 성공
    isAddingComment: false,
    addCommentErrorReason: '',
    commentAdded: false,
    hasMorePost: false,
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST: {
                return {
                    ...state,
                    isAddingPost: true,
                    addPostErrorReason: '',
                    postAdded: false,
                };
            }
            case ADD_POST_SUCCESS: {
                return {
                    ...state,
                    isAddingPost: false,
                    mainPosts: [action.data, ...state.mainPosts],
                    imagePaths: [],
                    postAdded: true,
                };
            }
            case ADD_POST_FAILURE: {
                return {
                    ...state,
                    isAddingPost: false,
                    addPostErrorReason: action.error,
                };
            }
            case REMOVE_POST_REQUEST: {
                // return {
                //     ...state,
                // };   
                break;  //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case REMOVE_POST_SUCCESS: {
                return {
                    ...state,
                    mainPosts: state.mainPosts.filter(v => v.id !== action.data)
                };
            }
            case REMOVE_POST_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case UPLOAD_IMAGES_REQUEST: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case UPLOAD_IMAGES_SUCCESS: {
                // return {
                //     ...state,
                //     imagePaths: [...state.imagePaths, ...action.data]
                // };
                action.data.forEach(p => { //그냥 데입을 해버리면 불변성이 깨지지만 immer를 사용하면 불변성 유지
                    draft.imagePaths.push(p);
                })
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case REMOVE_IMAGE: {
                // return {
                //     ...state,
                //     imagePaths: state.imagePaths.filter((v, i) => {
                //         return i !== action.index
                //     })
                // };
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                darft.imagePaths.splice(index, 1);
                break;
            }
            case ADD_COMMENT_REQUEST: {
                return {
                    ...state,
                    isAddingComment: true,
                    addCommentErrorReason: '',
                    commentAdded: false,
                };
            }
            case ADD_COMMENT_SUCCESS: {

                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                const post = state.mainPosts[postIndex];
                const Comments = [...post.Comments, action.data.comment];
                const mainPosts = [...state.mainPosts];
                mainPosts[postIndex] = {
                    ...post,
                    Comments
                };
                console.log(mainPosts)
                return {
                    ...state,
                    isAddingComment: false,
                    mainPosts,
                    commentAdded: true,
                };
            }
            case ADD_COMMENT_FAILURE: {
                return {
                    ...state,
                    isAddingComment: false,
                    addCommentErrorReason: action.error,
                };
            }
            case LIKE_POST_REQUEST: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case LIKE_POST_SUCCESS: {

                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                const post = state.mainPosts[postIndex];
                const Likers = [...post.Likers, {
                    id: action.data.userId
                }];
                const mainPosts = [...state.mainPosts];
                mainPosts[postIndex] = {
                    ...post,
                    Likers
                };
                return {
                    ...state,
                    mainPosts,
                };
            }
            case LIKE_POST_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case UNLIKE_POST_REQUEST: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case UNLIKE_POST_SUCCESS: {

                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                const post = state.mainPosts[postIndex];
                const Likers = post.Likers.filter(v => v.id !== action.data.userId);
                const mainPosts = [...state.mainPosts];
                debugger;
                mainPosts[postIndex] = {
                    ...post,
                    Likers
                };
                return {
                    ...state,
                    mainPosts,
                };
            }
            case UNLIKE_POST_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case RETWEET_REQUEST: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case RETWEET_SUCCESS: {
                return {
                    ...state,
                    mainPosts: [action.data, ...state.mainPosts],
                };
            }
            case RETWEET_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                const post = state.mainPosts[postIndex];
                const Comments = action.data.comments;
                const mainPosts = [...state.mainPosts];
                mainPosts[postIndex] = {
                    ...post,
                    Comments
                };
                return {
                    ...state,
                    mainPosts,
                };
            }
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST:
            case LOAD_MAIN_POSTS_REQUEST: {
                return {
                    ...state,
                    mainPosts: action.lastId === 0 ? [] : state.mainPosts,
                    hasMorePost: action.lastId ? state.hasMorePost : true,
                };
            }
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_MAIN_POSTS_SUCCESS: {
                return {
                    ...state,
                    mainPosts: state.mainPosts.concat(action.data),
                    hasMorePost: action.data.length === 10,
                };
            }
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_MAIN_POSTS_FAILURE: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
            default: {
                break; //immer를 사용했을때 아무것도 안하는 로직은 break;로 끝냄
            }
        }
    });
}

export default reducer;