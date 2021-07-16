import React from 'react'
import classes from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
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
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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