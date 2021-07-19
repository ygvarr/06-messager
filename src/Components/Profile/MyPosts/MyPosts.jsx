import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../Common/FormsControls/FormsControls'

const MyPosts = React.memo((props) => {
    const postElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} likes={p.likes} message={p.message}/>)
    const onAddPost = (values) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={classes.MyPosts}>
            <div className={classes.AddPost}>
                <h4>My posts:</h4>
                <AddNewPostForm onSubmit={onAddPost}/>
            </div>
            {postElements}
        </div>
    )
})
const maxLength10 = maxLengthCreator(10)
let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPostText'}
                   component={Textarea}
                   validate={[required, maxLength10]}
                   className={classes.MyPostsTextarea}
                   placeholder={'Enter your post'}/>
            <div>
                <button className={classes.MyPostsBtn}>Add</button>
            </div>
        </form>
    )
}
AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
export default MyPosts
