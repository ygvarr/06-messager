import React from 'react'
// import PathUserAva from './../../Media/ava.png'
import PathUserAva from './../../Media/ava.png'

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, fullName: 'John K.', status: 'Happy', followed: true, pathAva: PathUserAva,
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2, fullName: 'Alex P.', status: 'Happy', followed: false, pathAva: PathUserAva,
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3, fullName: 'Martin T.', status: 'Happy', followed: true, pathAva: PathUserAva,
                location: {city: 'Kiev', country: 'Ukraine'}
            }
        ])
    }
    return (
        <div>
            {props.users.map(u => (
                <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.pathAva} alt='#'/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>))}
        </div>
    )
}
export default Users