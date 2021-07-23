import React from 'react'
import classes from './ProfileInfo.module.css'
import {createField, Input, Textarea} from '../../Common/FormsControls/FormsControls'
import {reduxForm} from 'redux-form'

const ProfileDataForm = ({initialValues, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span className={classes.About}><b>Id: </b></span> {initialValues.userId}
            </div>
            <div>
                <h2>{createField('Full name', 'fullName', [], Input)}</h2>
            </div>
            <div>
                <span
                    className={classes.About}><b>About me: </b>
                </span> {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <span className={classes.About}>
                    <b>Looking for a job: </b>
                </span> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <span
                    className={classes.About}><b>Professional skills: </b>
                </span> {createField('Professional skills', 'lookingForAJobDescription', [], Textarea)}
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
                {error && <div className={classes.formSummaryError}>{error}</div>}
                <button className={classes.EditBtn}>Save
                </button>
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm