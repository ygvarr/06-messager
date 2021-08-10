import {FormAction, stopSubmit} from 'redux-form'
import {ResultCodesEnum} from '../api/api'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {BaseThunkType, InferActionTypes} from "./redux-store"

const initialState = {
    isAuth: false,
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    captchaUrl: null as string | null// if null, then captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => (
        {type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = response.messages.length > 0 ? response.messages[0] : 'Unknown error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = (): ThunkType => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
