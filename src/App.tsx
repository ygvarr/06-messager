import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Music from './Components/Music/Music'
import News from './Components/News/News'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import ProfileContainer from './Components/Profile/ProfileContainer'
import HeaderContainer from './Components/Header/HeaderContainer'
import {LoginPage} from './Components/Login/LoginPage'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './Components/Common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'
import Settings from './Components/Settings/Settings'
import {UserPage} from './Components/Users/UsersContainer'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='App'>
                <HeaderContainer/>
                <Navbar className='Navbar'/>
                <div className='Content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile/>}/>
                        <Route path='/im'
                               render={() => <SuspendedDialogs/>}/>
                        <Route path='/users'
                               render={() => <UserPage pageTitle='Users'/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='/feed' render={News}/>
                        <Route path='/music' render={Music}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
const AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App)
const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp
