import React from 'react'
import classes from './ProfileInfo.module.css'
import ReactPng from '../../../Media/react.png'
import Preloader from '../../Common/Preloader/Preloader'

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
                <div><h2>{props.profile.fullName}</h2></div>
                <div><span className={classes.About}>id: </span> {props.profile.userId}</div>
                <div><span className={classes.About}>status: </span>{props.profile.aboutMe}</div>
                <img className={classes.Photos} src={props.profile.photos.large} alt=''/>
            </div>
        </div>
    )
}
export default ProfileInfo