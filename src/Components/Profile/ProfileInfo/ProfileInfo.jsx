import React, {useState} from 'react'
import classes from './ProfileInfo.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ava from '../../../Media/ava.png'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = e => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div className={classes.ProfileInfo}>
            <div>
                <img className={classes.Photos} src={profile.photos.large || ava} alt=''/>
                <br/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
            </div>
        </div>
    )
}
export const Contacts = ({contactTitle, contactValue}) => {
    return (
        <div>
            <span className={classes.AboutDown}><b> {contactTitle}: </b></span> {contactValue}
        </div>
    )
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            <div>
                <span className={classes.About}><b>Id: </b></span> {profile.userId}
            </div>
            <div>
                <h2>{profile.fullName}</h2>
            </div>
            <div>
                <span
                    className={classes.About}><b>About me: </b>
                </span> {profile.aboutMe}
            </div>
            <div>
                <span className={classes.About}>
                    <b>Looking for a job: </b>
                </span> {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob && <div>
                <span
                    className={classes.About}><b>Professional skills: </b>
                </span> {profile.lookingForAJobDescription}
            </div>}
            <div>
                <span className={classes.About}><b>Contacts: </b></span>
                {Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
            <div>
                {isOwner && <button className={classes.EditBtn} onClick={goToEditMode}>Edit</button>}
            </div>
        </div>
    )
}
export default ProfileInfo