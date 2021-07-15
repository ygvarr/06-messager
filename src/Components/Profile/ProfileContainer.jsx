import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getStatus, getUserProfile, updateStatus} from '../../redux/profile-reducer'
import {compose} from 'redux'

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}
export default compose(connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus
}), withRouter)(ProfileContainer)
