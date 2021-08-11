import React from 'react'
import classes from './Header.module.css'
import PathHeaderLogo from '../../logo.svg'
import {NavLink} from 'react-router-dom'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <div className={classes.Header}>
            <img
                src={PathHeaderLogo}
                className={classes.HeaderLogo}
                alt='#'
            />
            <span>Welcome to </span>
            <NavLink className={classes.HeaderLink} to='/'>
                Social Network
            </NavLink>
            <span className={classes.LoginBlock}>
                {props.isAuth
                    ? <NavLink className={classes.HeaderLink} to='/profile'>
                        {props.login + ' '}
                        <button className={classes.LogoutBtn} onClick={props.logout}>Log out</button>
                    </NavLink>
                    : <NavLink className={classes.HeaderLink} to='/login'>Login</NavLink>}
            </span>
        </div>
    )
}
export default Header
