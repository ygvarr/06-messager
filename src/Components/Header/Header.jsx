import React from 'react'
import classes from './Header.module.css'
import PathHeaderLogo from '../../logo.svg'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return (
        <div className={classes.Header}>
            <img
                src={PathHeaderLogo}
                className={classes.HeaderLogo}
                alt='#'
                align='middle'
            />
            <span>Welcome to </span>
            <NavLink className={classes.HeaderLink} to='/'>
                Social Network
            </NavLink>
            <span className={classes.LoginBlock}>
                {props.isAuth
                    ? <NavLink className={classes.HeaderLink} to='/profile'>
                        {props.login + ' '}
                        <button onClick={props.logout}>Log out</button>
                    </NavLink>
                    : <NavLink className={classes.HeaderLink} to='/login'>Login</NavLink>}
            </span>
        </div>
    )
}
export default Header
