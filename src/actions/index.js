import * as actionTypes from './types';

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user,
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
        payload: {
            currentUser: null,
        }
    }
}

export const setCurrentChanel = (chanel) => {
    return {
        type: actionTypes.SET_CURRENT_CHANEL,
        payload: {
            currentChanel: chanel,
        }
    }
}