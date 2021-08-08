import {profileAPI, usersAPI} from '../api/api'
import {stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const initialState = {
    posts: [
        {id: 1, message: 'Success is the ability to go from failure to failure.', likes: 42},
        {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: 24},
        {id: 3, message: 'Our life is what our thoughts make it.', likes: 69}
    ] as Array<PostType>,
    status: '',
    newPostText: '',
    profile: null as ProfileType | null
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
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
        case  SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostText
})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    dispatch(savePhotoSuccess(response.data.data.photos))
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can\'t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.data.messages[0]}))
        return Promise.reject(data.data.messages[0])
    }
}
export default profileReducer