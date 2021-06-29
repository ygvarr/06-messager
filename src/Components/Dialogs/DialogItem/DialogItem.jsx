import React from 'react'
import classes from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

const DialogItem = (props) => {
    let path = '/im/' + props.id
    return (
        <div className={classes.DialogItem}>
            <NavLink to={path} className={classes.NavLink} activeClassName={classes.active}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem