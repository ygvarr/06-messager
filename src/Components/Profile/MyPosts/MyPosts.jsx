import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'

const PostData = [
    {id: 1, message: 'Success is the ability to go from failure to failure.', likes: '42'},
    {id: 2, message: 'Work hard to get what you like, otherwise you be forced to just like what you get.', likes: '24'},
    {id: 3, message: 'Our life is what our thoughts make it.', likes: '69'}
]

const PostElements = PostData.map(p => <Post likes={p.likes} message={p.message}/>)

const MyPosts = (props) => {
    return (
        <div className={classes.MyPosts}>
            <h4>My posts:</h4>
            <textarea className={classes.MyPostsTextarea}/>
            <div>
                <button className={classes.MyPostsBtn}>Add</button>
                <button className={classes.MyPostsBtn}>Remove</button>
            </div>
            {PostElements}
        </div>
    )
}

export default MyPosts
