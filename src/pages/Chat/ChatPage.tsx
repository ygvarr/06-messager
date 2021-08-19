import React from 'react'

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
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null)

  React.useEffect(() => {
    let ws: WebSocket
    const closeHandler = () => {
      setTimeout(createChanel, 3000)
    }
    function createChanel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
      )
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }
    createChanel()
    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return (
    <>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </>
  )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([])

  React.useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)
      setMessages(prevMessages => [...prevMessages, ...newMessages])
    }
    wsChannel?.addEventListener('message', messageHandler)
    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }
  }, [wsChannel])

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [message, setMessage] = React.useState('')
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>(
    'pending'
  )

  React.useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready')
    }
    wsChannel?.addEventListener('open', openHandler)
    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) return
    wsChannel?.send(message)
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
        <button
          onClick={sendMessage}
          disabled={wsChannel === null || readyStatus !== 'ready'}
        >
          Send
        </button>
      </div>
    </>
  )
}

export default ChatPage
