import React from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ava from '../../../Media/ava.png'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = e => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img className={classes.Photos} src={profile.photos.large || ava} alt=''/>
                <br/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <div><h2>{profile.fullName}</h2></div>
                <div><span className={classes.About}>id: </span> {profile.userId}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}
export default ProfileInfo