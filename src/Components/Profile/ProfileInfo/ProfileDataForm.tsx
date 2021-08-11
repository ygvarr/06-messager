import React from 'react'
import classes from './ProfileInfo.module.css'
import {createField, GetStringKeys, Input, Textarea} from '../../Common/FormsControls/FormsControls'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    initialValues: any
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm:
    React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({initialValues, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span className={classes.About}><b>Id: </b></span> {initialValues.userId}
            </div>
            <div>
                <h2>{createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}</h2>
            </div>
            <div>
                <span
                    className={classes.About}><b>About me: </b>
                </span> {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <span className={classes.About}>
                    <b>Looking for a job: </b>
                </span> {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <span
                    className={classes.About}><b>Professional skills: </b>
                </span> {createField<ProfileTypeKeys>('Professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <span className={classes.About}><b>Contacts: </b></span>
                {Object.keys(initialValues.contacts).map(key => {
                    return (
                        <div key={key}>
                            <span className={classes.AboutDown}>
                                <b>{key}: </b>
                            </span> {createField(key, 'contacts.' + key, [], Input)}
                        </div>
                    )
                })}
            </div>
            <div>
                <button className={classes.EditBtn}>Save</button>
                {error && <div className={classes.formSummaryError}>{error}</div>}
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm