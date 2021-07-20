import React from 'react'
import classes from './ProfileInfo.module.css'
import ReactPng from '../../../Media/react.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img src={ReactPng} className={classes.ReactPng} alt='ReactPng'/>
            </div>
            <div>
                <img className={classes.Photos} src={profile.photos.large} alt=''/>
                <div><h2>{profile.fullName}</h2></div>
                <div><span className={classes.About}>id: </span> {profile.userId}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}
export default ProfileInfo