import {connect} from 'react-redux'
import Users from './Users'
import {followAC, setUserAC, unfollowAC} from '../../redux/users-reducer'

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUserAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)