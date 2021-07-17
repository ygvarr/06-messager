import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Music from './Components/Music/Music'
import News from './Components/News/News'
import Settings from './Components/Settings/Settings'
import {Route, withRouter} from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/UsersContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import LoginPage from './Components/Login/Login'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './Components/Common/Preloader/Preloader'

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='App'>
                <HeaderContainer className='Header'/>
                <Navbar className='Navbar'/>
                <div className='Content'>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/im'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <LoginPage/>}/>
                    <Route path='/feed' render={News}/>
                    <Route path='/music' render={Music}/>
                    <Route path='/settings' render={Settings}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized
})
export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)

