import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import store from './redux/redux-store'
import './index.css'
import {Provider} from './StoreContext'

const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    )
}
// rerenderEntireTree(store.getState())
// store.subscribe(() => {
//     const state = store.getState()
//     rerenderEntireTree(state)
// })
rerenderEntireTree()
store.subscribe(() => {
    rerenderEntireTree()
})
reportWebVitals()
