import React from 'react'
import classes from './Users.module.css'
import PathUserAva from '../../Media/ava.png'
import {NavLink} from 'react-router-dom'

const Users = (props) => {
    const pages = []
    // const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    // for (let i = 1; i <= pagesCount; i++) {
    for (let i = 1; i <= 10; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div className={classes.NumPage}>
                {pages.map(p => <span
                    className={props.currentPage === p ? classes.SelectedPage : null}
                    onClick={(e) => props.onPageChanged(p)}
                    key={p}>{p} </span>)}
            </div>
            {props.users.map(u => (
                <div className={classes.Wrapper} key={u.id}>
                    <span>
                        <NavLink className={classes.NavLink} to={'/profile/' + u.id}>
                        <div>
                            <img className={classes.Ava} src={u.photos.small != null ? u.photos.small : PathUserAva}
                                 alt=''/>
                        </div>
                        <div>
                            <div className={classes.Name}>{u.name}</div>
                        </div>
                        </NavLink>
                        <span>
                            <div>id: {u.id}</div>
                            <div>{u.status}</div>
                        </span>
                        <div>
                            {u.followed
                                ? <button className={classes.FollowBtn} onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button className={classes.FollowBtn} onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div className={classes.Temp}>{'u.location.country'}</div>
                            <div className={classes.Temp}>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>))}
        </div>
    )
}
export default Users