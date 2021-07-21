import ReactDOM from 'react-dom'
import React from 'react'
import MainApp from './App'
import reportWebVitals from './reportWebVitals'
import store from './redux/redux-store'
import './index.css'

ReactDOM.render(
    <MainApp/>, document.getElementById('root')
)
reportWebVitals()
window.store = store