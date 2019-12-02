
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import ResizableContainer from './ResizableContainer'

class EditScreenSandbox extends Component {
    
    constructor() {
        super()
        this.state = {
            clickedId: 0,
        }
    }

    handleNoneSelected = (e) =>
    {
        this.setState({
            clickedId: "-1",
        })
        console.log("handleNoneSelected")

    }

    handleNodeSelected = (id, e) =>
    {
        this.setState({
            clickedId: id,
        })

        console.log("handleNodeSelected");
        e.stopPropagation();
    }
    
    handleSandboxSelected = (e) =>
    {
        this.setState({
            clickedId: "0",
        })
        console.log("handleSandboxSelected")
        e.stopPropagation();
    }


    render() {
        console.log(this.state.clickedId)
        return (
            <div className="sandbox-container" onClick={this.handleNoneSelected}>
                <div className="sandbox" onClick = {this.handleSandboxSelected} id="0">
                    <ResizableContainer clickedId={this.state.clickedId} onClick = {this.handleNodeSelected} id="1"/>
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
)(EditScreenSandbox);

