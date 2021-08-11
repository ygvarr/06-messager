import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Input} from '../../../Common/FormsControls/FormsControls'
import {required} from '../../../../utils/validators/validators'
import classes from "../MyPosts.module.css";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.AddPost}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText', [required], Input)}
            </div>
            <div>
                <button className={classes.MyPostsBtn}>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profile-add-post'})(AddPostForm)