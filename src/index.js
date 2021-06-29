import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const posts = [
    {id: 1, message: 'Success is the ability to go from failure to failure.', likes: '42'},
    {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like.', likes: '24'},
    {id: 3, message: 'Our life is what our thoughts make it.', likes: '69'}
]

const dialogs = [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'John'},
    {id: 3, name: 'Martin'}
]

const messages = [
    {id: 1, messages: 'Hey'},
    {id: 2, messages: 'How are you?'},
    {id: 3, messages: 'Nice'}
]

ReactDOM.render(
    <React.StrictMode>
        <App posts={posts} dialogs={dialogs} messages={messages}/>
    </React.StrictMode>, document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
