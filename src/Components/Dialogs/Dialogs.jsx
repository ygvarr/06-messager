import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer'

const Dialogs = (props) => {
    //const state = props.store.getState().dialogsPage
    const state = props.store.getState().dialogsReducer
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElements = state.messages.map(m => <Message message={m.messages} key={m.id}/>)
    const newMessageBody = state.newMessageBody
    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (e) => {
        let body = e.target.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }
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