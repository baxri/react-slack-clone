import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialStateUser = {
    currentUser: null,
    isLoading: true,
};

const userReducer = (state = initialStateUser, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, currentUser: action.payload.currentUser, isLoading: false }
            break;
        case actionTypes.CLEAR_USER:
            return { ...state, currentUser: null, isLoading: false }
            break;
        default:
            return state;
    }
}

const initialStateChanel = {
    messages: [],
    userPosts: {},
    currentChanel: null,
    isPrivateChanel: false,
};

const chanelReducer = (state = initialStateChanel, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANEL:
            return { ...state, currentChanel: action.payload.currentChanel };
            break;
        case actionTypes.SET_MESSAGES:
            return { ...state, messages: action.payload.messages };
            break;
        case actionTypes.SET_USER_POSTS:
            return { ...state, userPosts: action.payload.userPosts };
            break;
        case actionTypes.SET_PRIVATE_CHANEL:
            return { ...state, isPrivateChanel: action.payload.isPrivateChanel };
            break;
        default:
            return state;
    }
}

const rooReducer = combineReducers({
    user: userReducer,
    chanel: chanelReducer,
});

export default rooReducer;


