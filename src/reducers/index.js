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
    currentChanel: null,
};

const chanelReducer = (state = initialStateChanel, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANEL:
            return { ...state, currentChanel: action.payload.currentChanel }
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


