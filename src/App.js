import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Music from './Components/Music/Music'
import News from './Components/News/News'
import Settings from './Components/Settings/Settings'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/UsersContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import LoginPage from './Components/Login/Login'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './Components/Common/Preloader/Preloader'
import store from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'

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
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/im'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/users'
                               render={withSuspense(UsersContainer)}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='/feed' render={News}/>
                        <Route path='/music' render={Music}/>
                        <Route path='/settings' render={Settings}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized
})
const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)
const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp
