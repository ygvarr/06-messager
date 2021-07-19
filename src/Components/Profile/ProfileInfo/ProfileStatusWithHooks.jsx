import React, {useEffect, useState} from 'react'
import classes from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    return (
        <div className={classes.WrapperStatus}>status:{' '}
            {!editMode &&
            <span className={classes.Status}
                  onDoubleClick={activateEditMode}>{props.status || '♥'}</span>
            }
            {editMode &&
            <input className={classes.SetStatus}
                   onBlur={deactivateEditMode}
                   autoFocus={true}
                   value={status}
                   onChange={onStatusChange}
            />
            }
        </div>
    )
}
export default ProfileStatusWithHooks