import {profileAPI, usersAPI} from '../api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const initialState = {
    posts: [
        {id: 1, message: 'Success is the ability to go from failure to failure.', likes: 42},
        {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: 24},
        {id: 3, message: 'Our life is what our thoughts make it.', likes: 69}
    ],
    status: '',
    profile: null
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            console.log(state.posts)
            const idGen = () => state.posts.length + 1
            const newPost = {
                id: idGen(),
                message: action.newPostText,
                likes: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case  SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case  SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}
export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}
export default profileReducer