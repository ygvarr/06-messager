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
    ]
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const idGen = () => state.messages.length + 1
            const body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: idGen(), messages: body}]
            }
        default:
            return state
    }
}
export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReducer