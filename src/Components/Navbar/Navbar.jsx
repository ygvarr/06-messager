import React from 'react'
import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div className={classes.Navbar}>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/profile'>
                My profile
            </NavLink>
            <br/>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/users'>
                Users
            </NavLink>
            <br/>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/feed'>
                News
            </NavLink>
            <br/>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/im'>
                Messenger
            </NavLink>
            <br/>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/music'>
                Music
            </NavLink>
            <br/>
            <NavLink className={classes.NavLink} activeClassName={classes.active} to='/settings'>
                Settings
            </NavLink>
            <br/>
        </div>
    )
}
export default Navbar
