import React from 'react'
import classes from './ProfileInfo.module.css'
import ReactPng from '../../../Media/react.png'

const ProfileInfo = (props) => {
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img src={ReactPng} className={classes.ReactPng} alt='ReactPng'/>
            </div>
            <div>Ava + description</div>
        </div>
    )
}
export default ProfileInfo