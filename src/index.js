import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import state, {addPost, subscribe, updateNewPostText} from './redux/state'
import './index.css'

const rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 addPost={addPost}
                 updateNewPostText={updateNewPostText}/>
        </React.StrictMode>, document.getElementById('root')
    )
}
rerenderEntireTree(state)
subscribe(rerenderEntireTree)
reportWebVitals()
