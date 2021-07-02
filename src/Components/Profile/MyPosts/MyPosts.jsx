import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
    const postElements = props.posts.map(p => <Post key={p.id} likes={p.likes} message={p.message}/>)
    const newPostElement = React.createRef()
    const addPost = () => {
        props.dispatch({type: 'ADD-POST'})
    }
    const onPostChange = () => {
        const text = newPostElement.current.value
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text})
    }
    return (
        <div className={classes.MyPosts}>
            <div className={classes.AddPost}>
                <h4>My posts:</h4>
                <textarea onChange={onPostChange}
                          ref={newPostElement}
                          value={props.newPostText}
                          className={classes.MyPostsTextarea}/>
                <div>
                    <button onClick={addPost} className={classes.MyPostsBtn}>Add</button>
                    <button className={classes.MyPostsBtn}>Remove</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts
