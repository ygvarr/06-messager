import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <span onDoubleClick={this.enableEditMode}>{this.props.status}</span>
                }
                {this.state.editMode &&
                <input onBlur={this.disableEditMode} placeholder={'write status...'} autoFocus={true}/>
                }
            </div>
        )
    }
}

export default ProfileStatus