// import PathUserAva from './../Media/ava.png'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const initialState = {
    users: [
        // {
        //     id: 1, fullName: 'John K.', status: 'Happy', followed: true, pathAva: PathUserAva,
        //     location: {city: 'Minsk', country: 'Belarus'}
        // },
        // {
        //     id: 2, fullName: 'Alex P.', status: 'Happy', followed: false, pathAva: PathUserAva,
        //     location: {city: 'Moscow', country: 'Russia'}
        // },
        // {
        //     id: 3, fullName: 'Martin T.', status: 'Happy', followed: true, pathAva: PathUserAva,
        //     location: {city: 'Kiev', country: 'Ukraine'}
        // }
    ]
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUserAC = (users) => ({type: SET_USERS, users})
export default usersReducer