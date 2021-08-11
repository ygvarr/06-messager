import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Textarea} from '../Common/FormsControls/FormsControls'
import {maxLengthCreator, required} from '../../utils/validators/validators'
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = {
    newMessageBody: string;
}
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>

const Dialogs: React.FC<PropsType> = (props) => {
    const state = props.dialogsPage
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    const messagesElements = state.messages.map(m => <Message message={m.messages} key={m.id}/>)
    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }
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

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button className={classes.DialogsBtn}>
                    Send
                </button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs