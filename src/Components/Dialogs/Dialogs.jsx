import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElements = props.messages.map(m => <Message message={m.messages} key={m.id}/>)
    return (
        <div className={classes.Dialogs}>
            <div>{dialogsElements}</div>
            <div>{messagesElements}</div>
        </div>
    )
}

export default Dialogs