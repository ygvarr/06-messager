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
            ]
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Success is the ability to go from failure to failure.', likes: '42'},
                {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: '24'},
                {id: 3, message: 'Our life is what our thoughts make it.', likes: '69'}
            ],
            newPostText: ''
        },
        navbar: {}
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
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 4,
                message: this._state.profilePage.newPostText,
                likes: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}
//window.store = store
export default store