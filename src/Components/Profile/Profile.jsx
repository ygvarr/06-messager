import React from 'react'
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
    return (
        <div className={classes.Profile}>
            <ProfileInfo profile={props.profile}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}
export default Profile
