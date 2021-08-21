import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../api/chat-api'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'

const ChatPage: React.FC = () => {
  return <Chat />
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return (
    <>
      {status === 'error' && <div>Some error occured</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [messages, isAutoScroll])

  return (
    <div
      style={{ height: '400px', overflowY: 'auto' }}
      onScroll={scrollHandler}
    >
      {messages.map(m => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    return (
      <>
        <div>
          <img src={message.photo} alt='' style={{ width: '50px' }} />
          {message.message}
        </div>
        <div>{message.userName}</div>
        <hr />
      </>
    )
  }
)

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) return
    dispatch(sendMessage(message))
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
        <button onClick={sendMessageHandler} disabled={status !== 'ready'}>
          Send
        </button>
      </div>
    </>
  )
}

export default ChatPage
