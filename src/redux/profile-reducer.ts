import {FormAction, stopSubmit} from 'redux-form'
import {profileAPI} from '../api/profile-api'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {BaseThunkType, InferActionTypes} from "./redux-store";

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            const idGen = () => state.posts.length + 1
            const newPost = {
                id: idGen(),
                message: action.newPostText,
                likes: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case  'SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case  'SET_STATUS':
            return {...state, status: action.status}
        case  'SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}
export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can\'t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>