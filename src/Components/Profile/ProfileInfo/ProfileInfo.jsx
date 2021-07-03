import React from 'react'
import classes from './ProfileInfo.module.css'
import ReactPng from '../../../Media/react.png'

const ProfileInfo = (props) => {
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img src={ReactPng} className={classes.ReactPng} alt='ReactPng'/>
            </div>
            <h3><i>Photo and description</i></h3>
        </div>
    )
}
export default ProfileInfo