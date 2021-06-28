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
        </div>
    )
}

export default Header
