import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'

const store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Alex'},
                {id: 2, name: 'John'},
                {id: 3, name: 'Martin'}
            ],
            messages: [
                {id: 1, messages: 'Hey'},
                {id: 2, messages: 'How are you?'},
                {id: 3, messages: 'Nice'}
            ],
            newMessageBody: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Success is the ability to go from failure to failure.', likes: '42'},
                {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: '24'},
                {id: 3, message: 'Our life is what our thoughts make it.', likes: '69'}
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}
window.store = store
export default store