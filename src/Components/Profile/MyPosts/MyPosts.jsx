import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
    const postElements = props.posts.map(p => <Post key={p.id} likes={p.likes} message={p.message}/>)
    return (
        <div className={classes.MyPosts}>
            <h4>My posts:</h4>
            <textarea className={classes.MyPostsTextarea}/>
            <div>
                <button className={classes.MyPostsBtn}>Add</button>
                <button className={classes.MyPostsBtn}>Remove</button>
            </div>
            {postElements}
        </div>
    )
}

export default MyPosts
