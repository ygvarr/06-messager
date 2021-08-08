import {stopSubmit} from 'redux-form'
import {authAPI, ResultCodesEnum, securityAPI} from '../api/api'

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'
export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    captchaUrl: string | null,
    isAuth: boolean
}
const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    captchaUrl: null,
    isAuth: false
}
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
export type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
)
type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => (
    {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
)
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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
export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export default authReducer