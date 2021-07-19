import React from 'react'
import classes from './ProfileInfo.module.css'
import ReactPng from '../../../Media/react.png'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img src={ReactPng} className={classes.ReactPng} alt='ReactPng'/>
            </div>
            <div>
                <img className={classes.Photos} src={props.profile.photos.large} alt=''/>
                <div><h2>{props.profile.fullName}</h2></div>
                <div><span className={classes.About}>id: </span> {props.profile.userId}</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}
export default ProfileInfo