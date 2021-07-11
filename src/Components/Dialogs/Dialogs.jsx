import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Redirect} from 'react-router-dom'

const Dialogs = (props) => {
    const state = props.dialogsPage
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElements = state.messages.map(m => <Message message={m.messages} key={m.id}/>)
    const newMessageBody = state.newMessageBody
    const onSendMessageClick = () => {
        props.sendMessage()
    }
    const onNewMessageChange = (e) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }
    if (!props.isAuth) return <Redirect to='/login'/>
    return (
        <div className={classes.Dialogs}>
            <div>{dialogsElements}</div>
            <div>
                {messagesElements}
                <div className={classes.DialogsNewMessageFrame}>
                    <div>
                        <textarea placeholder={'Enter your message'}
                                  className={classes.DialogsTextarea}
                                  value={newMessageBody}
                                  onChange={onNewMessageChange}/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}
                                className={classes.DialogsBtn}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dialogs