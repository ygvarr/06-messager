import React from 'react'
import classes from './Dialogs.module.css'
import {NavLink} from 'react-router-dom'

const DialogsData = [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'John'},
    {id: 3, name: 'Martin'}
]

const MessagesData = [
    {id: 1, message: 'Hey'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Nice'}
]

const DialogItem = (props) => {
    let path = '/im/' + props.id
    return (
        <div className={classes.Dialogs}>
            <NavLink to={path} className={classes.NavLink} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={classes.dialog}>{props.message}</div>
    )
}

const DialogsElements = DialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)
const MessagesElements = MessagesData.map(m => <Message message={m.message}/>)

const Dialogs = (props) => {
    return (
        <div className={classes.Dialogs}>
            <div className={classes.DialogsItems}>
                {DialogsElements}
            </div>
            <div className={classes.Messages}>
                {MessagesElements}
            </div>
        </div>
    )
}

export default Dialogs