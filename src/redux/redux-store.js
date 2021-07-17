import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})
const store = createStore(reducers, applyMiddleware(thunk))
export default store