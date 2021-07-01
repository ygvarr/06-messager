import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
import Dialogs from './Components/Dialogs/Dialogs'
import Music from './Components/Music/Music'
import News from './Components/News/News'
import Settings from './Components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header className='Header'/>
                <Navbar className='Navbar'/>
                <div className='Content'>
                    <Route path='/profile'
                           render={() => <Profile state={props.state.profilePage}
                                                  addPost={props.addPost}
                                                  updateNewPostText={props.updateNewPostText}/>}/>
                    <Route path='/im'
                           render={() => <Dialogs dialogs={props.state.dialogsPage.dialogs}
                                                  messages={props.state.dialogsPage.messages}/>}/>
                    <Route path='/feed' render={News}/>
                    <Route path='/music' render={Music}/>
                    <Route path='/settings' render={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    )
}
export default App
