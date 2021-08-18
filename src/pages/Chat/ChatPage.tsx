import React from 'react'

const wsChannel = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
)

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = () => {
  return <Chat />
}

const Chat: React.FC = () => {
  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  )
}

const Messages: React.FC = () => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([])

  React.useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)
      setMessages(prevMessages => [...prevMessages, ...newMessages])
    })
  }, [])

  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <>
      <div>
        <img src={message.photo} alt='' height='50' />
        {message.message}
      </div>
      <div>{message.userName}</div>
      <hr />
    </>
  )
}

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = React.useState('')

  const sendMessage = () => {
    if (!message) return
    wsChannel.send(message)
    setMessage('')
  }

  return (
    <>
      <div>
        <textarea
          onChange={e => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default ChatPage
