import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals'
import store from './redux/redux-store'
import './index.css'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)
reportWebVitals()
window.store = store