import React from 'react'
import classes from './Users.module.css'
import PathUserAva from '../../Media/ava.png'
import {NavLink} from 'react-router-dom'

const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={classes.Wrapper} key={user.id}>
            <span>
                <NavLink className={classes.NavLink} to={'/profile/' + user.id}>
                    <div>
                        <img className={classes.Ava} src={user.photos.small != null ? user.photos.small : PathUserAva}
                             alt=''/>
                        </div>
                    <div>
                            <div className={classes.Name}>{user.name}</div>
                        </div>
                        </NavLink>
                        <span>
                            <div>id: {user.id}</div>
                            <div>{user.status}</div>
                        </span>
                        <div>
                            {user.followed
                                ? <button className={classes.FollowBtn}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}>Unfollow</button>
                                : <button className={classes.FollowBtn}
                                          disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div className={classes.Temp}>{'user.location.country'}</div>
                            <div className={classes.Temp}>{'user.location.city'}</div>
                        </span>
                    </span>
        </div>)
}
export default User