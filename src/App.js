import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
import Music from './Components/Music/Music'
import News from './Components/News/News'
import Settings from './Components/Settings/Settings'
import {Route} from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'

const App = () => {
    return (
        <div className='App'>
            <Header className='Header'/>
            <Navbar className='Navbar'/>
            <div className='Content'>
                <Route path='/profile'
                       render={() => <Profile/>}/>
                <Route path='/im'
                       render={() => <DialogsContainer/>}/>
                <Route path='/feed' render={News}/>
                <Route path='/music' render={Music}/>
                <Route path='/settings' render={Settings}/>
            </div>
        </div>
    )
}
export default App
