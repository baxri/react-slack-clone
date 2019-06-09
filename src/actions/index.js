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

export const setPrivateChanel = (isPrivateChanel) => {

    return {
        type: actionTypes.SET_PRIVATE_CHANEL,
        payload: {
            isPrivateChanel
        }
    }
}

export const setMessages = (messages) => {
    return {
        type: actionTypes.SET_MESSAGES,
        payload: {
            messages
        }
    }
}

export const setUserPosts = (userPosts) => {
    return {
        type: actionTypes.SET_USER_POSTS,
        payload: {
            userPosts
        }
    }
}