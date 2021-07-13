import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUserProfile} from '../../redux/profile-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer)
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}
const withUrlDataContainerComponent = withRouter(AuthRedirectComponent)
export default connect(mapStateToProps, {getUserProfile})(withUrlDataContainerComponent)