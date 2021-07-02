import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './redux/state'
import './index.css'

const rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}
                 store={store}/>
        </React.StrictMode>, document.getElementById('root')
    )
}
rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)
reportWebVitals()
