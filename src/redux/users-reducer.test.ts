import usersReducer, {actions, InitialState} from "./users-reducer"

let state: InitialState
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Alex', followed: false, status: '', photos: {small: null, large: null}},
            {id: 1, name: 'John', followed: false, status: '', photos: {small: null, large: null}},
            {id: 2, name: 'Bob', followed: true, status: '', photos: {small: null, large: null}},
            {id: 3, name: 'Ted', followed: true, status: '', photos: {small: null, large: null}}
        ],
        pageSize: 1,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('followSuccess', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollowSuccess', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})