
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
import { editWireframeHandler } from '../../store/database/asynchHandler';

class EditScreen extends Component {

    updateComponent = (component) =>{
        console.log("Update component: ");
        let wireframe = this.props.wireframe;
        this.props.wireframe.components[component.key] = component;
    }

    saveWF = (e) =>
    {
        this.props.updateWF(this.props.user);
    }

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
                    <AddControlBar saveWF = {this.saveWF} />

                    </div>
                    <div className="col no-padding">
                    <EditScreenSandbox updateComponent = {this.updateComponent} wireframe={this.props.wireframe}/>
                    </div>
                    <div className="col no-padding">
                    <EditControlBar />
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null;
    //todoList.id = id;

    const frameId = ownProps.match.params.frameId;
    let wireframe = []
    if (user){
        user.id = state.firebase.auth.uid;
        const wireframes = user.wireFrames;
        wireframe = wireframes[frameId]
    }

    return {
        user,
        auth: state.firebase.auth,
        firebase: state.firebase,
        wireframe,
    };
};

const mapDispatchToProps = dispatch => ({
    updateWF: user => dispatch(editWireframeHandler(user)),
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(EditScreen);

