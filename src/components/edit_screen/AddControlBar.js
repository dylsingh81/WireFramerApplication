
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class AddControlBar extends Component {
    render() {

        return (
            <div className="menu" id="add-ctrl">
                <div>
                    <button onClick={this.props.zoomIn} className="sandbox-button material-icons btn-small yellow darken-1">zoom_in</button>
                    <div className="h1-divider" />
                    <button onClick={this.props.zoomOut} className="sandbox-button material-icons btn-small yellow darken-1">zoom_out</button>
                </div>
                <hr />
                <div>
                    <button onClick={this.props.saveWF} className="sandbox-button save-close-btn btn-small red lighten-2">Save</button>
                    <div className="h1-divider" />
                    <Link to={!this.props.needsSave ? "/" : "././" + this.props.frameId}
                        onClick={this.props.openCloseWFModal} className="sandbox-button save-close-btn btn-small red lighten-2">Close
                    </Link>
                </div>
                <hr />
                <div id="controls">
                    <div id="add-container-crtl" onClick={this.props.addContainer} />
                    <div className="crtl-label"><label className="crtl-label">Container</label></div>

                    <label id="add-label-crtl" onClick={this.props.addLabel}>Prompt for input:</label>
                    <div className="crtl-label"><label className="crtl-label">Label</label></div>

                    <button id="add-button-crtl" onClick={this.props.addButton}>Submit</button>
                    <div className="crtl-label"><label className="crtl-label">Button</label></div>

                    <input readOnly className="edit-field" type="text" value="Input" onClick={this.props.addInput}></input>
                    <div className="crtl-label"><label className="crtl-label">Textfield</label></div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null;
    //todoList.id = id;

    if (user)
        user.id = state.firebase.auth.uid;

    return {
        user,
        auth: state.firebase.auth,
        firebase: state.firebase
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(AddControlBar);

