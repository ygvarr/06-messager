import React from 'react'
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'
import StoreContext from '../../../StoreContext'

const MyPostsContainer = () => {
    return <StoreContext.Consumer>
        {(store) => {
            const state = store.getState()
            const addPost = () => {
                store.dispatch(addPostActionCreator())
            }
            const onPostChange = (text) => {
                const action = updateNewPostTextActionCreator(text)
                store.dispatch(action)
            }
            return <MyPosts updateNewPostText={onPostChange}
                            addPost={addPost}
                            posts={state.profileReducer.posts}
                            newPostText={state.profileReducer.newPostText}/>
        }}
    </StoreContext.Consumer>
}
export default MyPostsContainer
