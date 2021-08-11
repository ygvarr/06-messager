import React from 'react'
import classes from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
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