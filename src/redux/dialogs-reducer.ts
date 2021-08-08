const SEND_MESSAGE = 'SEND-MESSAGE'
type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    messages: string
}
const initialState = {
    dialogs: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'John'},
        {id: 3, name: 'Martin'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, messages: 'Hey'},
        {id: 2, messages: 'How are you?'},
        {id: 3, messages: 'Nice'}
    ] as Array<MessageType>
}
export type InitialStateType = typeof initialState
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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
type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
    type: SEND_MESSAGE,
    newMessageBody
})
export default dialogsReducer