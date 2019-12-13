
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

    constructor(props) {
        super(props);
        this.state = {
            saved: false,
            currentWF: null,
        }
    }

    updateComponent = (component) => {
        console.log("Update component: ");
        this.props.wireframe.components[component.key] = component;
    }

    saveWF = (e) => {
        this.props.updateWF(this.props.user);
    }

    addContainer = (e) => {
        let newContainer = {
            "key": this.props.wireframe.components.length,
            "type": "container",
            "text": "",
            "x": 5,
            "y": 5,
            "width": "100px",
            "height": "100px",
            "font-size": "12px",
            "font-color": "black",
            "border-color": "blue",
            "background-color": "gray",
            "border-radius": "2px"
        }
        this.props.wireframe.components.push(newContainer);
        this.forceUpdate();
    }

    addLabel = (e) => {
        let newLabel = {
            "key": this.props.wireframe.components.length,
            "type": "label",
            "text": "Prompt for input",
            "x": 5,
            "y": 5,
            "width": "85px",
            "height": "30px",
            "font-size": "12px",
            "font-color": "black",
            "border-color": "blue",
            "background-color": "gray",
            "border-radius": "2px"
        }
        this.props.wireframe.components.push(newLabel);
        this.forceUpdate();
    }

    addButton = (e) => {
        let newButton = {
            "key": this.props.wireframe.components.length,
            "type": "button",
            "text": "",
            "x": 5,
            "y": 5,
            "width": "85px",
            "height": "30px",
            "font-size": "12px",
            "font-color": "black",
            "border-color": "blue",
            "background-color": "gray",
            "border-radius": "2px"
        }
        this.props.wireframe.components.push(newButton);
        this.forceUpdate();
    }

    addInput = (e) => {
        let newInput = {
            "key": this.props.wireframe.components.length,
            "type": "input",
            "text": "",
            "x": 5,
            "y": 5,
            "width": "85",
            "height": "30px",
            "font-size": "12px",
            "font-color": "black",
            "border-color": "blue",
            "background-color": "gray",
            "border-radius": "2px"
        }
        this.props.wireframe.components.push(newInput);
        this.forceUpdate();
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
                        <AddControlBar 
                        addContainer = {this.addContainer}
                        addLabel = {this.addLabel}
                        addButton = {this.addButton}
                        addInput = {this.addInput}
                        saveWF={this.saveWF} />

                    </div>
                    <div className="col no-padding">
                        <EditScreenSandbox updateComponent={this.updateComponent} wireframe={this.props.wireframe} />
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
    if (user) {
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

