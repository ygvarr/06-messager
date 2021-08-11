import React from 'react'
import classes from './Post.module.css'
import PathPostAva from '../../../../Media/ava.png'

type PropsType = {
    message: string
    likes: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.Post}>
            <img className={classes.PostAva} src={PathPostAva} alt='#'/>
            {props.message}
            <div>
                <span className={classes.Like}>like this ♥ {props.likes}</span>
            </div>
        </div>
    )
}

export default Post
