const state = {
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
}
export const addPost = () => {
    const newPost = {
        id: 4,
        message: state.profilePage.newPostText,
        likes: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}
let rerenderEntireTree = () => {
}
export const subscribe = (observer) => {
    rerenderEntireTree = observer
}
export default state