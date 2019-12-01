
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditScreenHeader from './EditScreenHeader'
import EditScreenSandbox from './EditScreenSandbox'
import AddControlBar from './AddControlBar'
import EditControlBar from './EditControlBar'

class EditScreen extends Component {
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="edit-screen">
                <div>
                    <EditScreenHeader />
                </div>
                <div className="row">
                    <div className="col no-padding">
                    <AddControlBar />

                    </div>
                    <div className="col no-padding">
                    <EditScreenSandbox />
                    </div>
                    <div className="col no-padding">
                    <EditControlBar />
                    </div>
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
)(EditScreen);

