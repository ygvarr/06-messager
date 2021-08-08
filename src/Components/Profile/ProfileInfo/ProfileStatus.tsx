import React, {ChangeEvent} from 'react'
import classes from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    enableEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    disableEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={classes.WrapperStatus}>status:{' '}
                {!this.state.editMode &&
                <span className={classes.Status}
                      onDoubleClick={this.enableEditMode}>{this.props.status || 'null'}</span>
                }
                {this.state.editMode &&
                <input className={classes.SetStatus}
                       onBlur={this.disableEditMode}
                       autoFocus={true}
                       value={this.state.status}
                       onChange={this.onStatusChange}
                />
                }
            </div>
        )
    }
}

export default ProfileStatus