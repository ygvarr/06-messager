import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Field, reduxForm} from 'redux-form'
import {Redirect} from 'react-router-dom'
import {Textarea} from '../Common/FormsControls/FormsControls'
import {maxLengthCreator, required} from '../../utils/validators/validators'

const Dialogs = (props) => {
    const state = props.dialogsPage
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElements = state.messages.map(m => <Message message={m.messages} key={m.id}/>)
    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }
    if (!props.isAuth) return <Redirect to='/login'/>
    return (
        <div className={classes.Dialogs}>
            <div>{dialogsElements}</div>
            <div>
                {messagesElements}
                <div className={classes.DialogsNewMessageFrame}>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}
const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={classes.DialogsField}
                       component={Textarea}
                       validate={[required, maxLength50]}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}/>
            </div>
            <div>
                <button className={classes.DialogsBtn}>
                    Send
                </button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs