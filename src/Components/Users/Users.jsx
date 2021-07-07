import React from 'react'
import PathUserAva from './../../Media/ava.png'
import axios from 'axios'
import classes from './Users.module.css'

class Users extends React.Component {
    componentDidMount() {
        this.props.users.length = 0
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
                {this.props.users.map(u => (
                    <div className={classes.Wrapper} key={u.id}>
                    <span>
                        <div>
                            <img className={classes.Ava} src={u.photos.small != null ? u.photos.small : PathUserAva}
                                 alt=''/>
                        </div>
                        <div>
                            {u.followed
                                ? <button className={classes.FollowBtn} onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button className={classes.FollowBtn} onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                        <span>
                        <span>
                            <div className={classes.Name}>{u.name}</div>
                            <div>{u.status}</div>
                            <div>id: {u.id}</div>
                        </span>
                        <span>
                            <div className={classes.Temp}>{'u.location.country'}</div>
                            <div className={classes.Temp}>{'u.location.city'}</div>
                        </span>
                    </span>
                    </div>))}
            </div>
        )
    }
}

export default Users