import {getAuthUserData} from './auth-reducer'
import {InferActionTypes} from "./redux-store";

const initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    promise.then([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}
export default appReducer