const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'
const initialState = {
    dialogs: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'John'},
        {id: 3, name: 'Martin'}
    ],
    messages: [
        {id: 1, messages: 'Hey'},
        {id: 2, messages: 'How are you?'},
        {id: 3, messages: 'Nice'}
    ],
    newMessageBody: ''
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {...state, newMessageBody: action.body}
        case SEND_MESSAGE:
            const idGen = () => state.messages.length + 1
            const body = state.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: idGen(), messages: body}],
                newMessageBody: ''
            }
        default:
            return state
    }
}
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})
export default dialogsReducer