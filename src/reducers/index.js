import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
    currentUser: null,
    isLoading: true,
};

const userReducer = (state = initialState, action) => {
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

const rooReducer = combineReducers({
    user: userReducer,
});

export default rooReducer;


