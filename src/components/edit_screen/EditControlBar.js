
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import CircleColorPicker from './CircleColorPicker.js';


class EditControlBar extends Component {
    render() {

        return (
            <div className="menu" id="edit-ctrl">
                <div className="properties-label">
                    <label htmlFor="properties" className="active edit-label">Properties</label>
                    <hr/>
                    <input className="active bold-text edit-field" type="text" name="properties" />
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Font Size:</label>
                    <input type="number" id="font-size-input" className="custom-input edit-field" min="1" max="99"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Background Color:</label>
                    <CircleColorPicker id="background-color-input"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Border Color:</label>
                    <CircleColorPicker id="border-color-input"/>
                </div>
                <hr/>
                <div className>
                    <label className="edit-label">Border Thickness:</label>
                    <input type="number" id="border-thick-input" className="custom-input edit-field" min="1" max="99"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Border Radius:</label>
                    <input type="number" id="border-rad-input" className="custom-input edit-field" min="1" max="99"/>
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

    console.log(users);

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
)(EditControlBar);

