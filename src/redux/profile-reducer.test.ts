import profileReducer, {actions} from './profile-reducer'
import {PostType} from "../types/types";

let state = {
    posts: [
        {id: 1, message: 'Success is the ability to go from failure to failure.', likes: 42},
        {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: 24},
        {id: 3, message: 'Our life is what our thoughts make it.', likes: 69}
    ] as Array<PostType>,
    status: '',
    profile: null
}
it('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPostActionCreator('new post test text')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(4)
})
it('message of new post should be correct', () => {
    // 1. test data
    let action = actions.addPostActionCreator('new post test text')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts[3].message).toBe('new post test text')
})