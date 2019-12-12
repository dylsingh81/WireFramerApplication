
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
            components: [1,2,]
        }
    }

    handleNoneSelected = (e) =>
    {
        this.setState({
            clickedId: "-2",
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
            clickedId: "-1",
        })
        console.log("handleSandboxSelected")
        e.stopPropagation();
    }

    getId(){

    }
    //CHANGE CONTAINER TO OBJECT, THEN IN OBJECT USE TYPE TO RETURN() based on IF, of what you want. * return(<ResizeabkeLabel/>)
    render() {
        console.log(this.state.clickedId)
        const components = this.state.components
        return (
            <div className="sandbox-container" onClick={this.handleNoneSelected}>
                <div className="sandbox" onClick = {this.handleSandboxSelected} id="-1">
                {components && components.map(component => (
                    <ResizableContainer onDrag = {this.handleNodeSelected} component={component} type={component.type} clickedId={this.state.clickedId} onClick = {this.handleNodeSelected} id={component}/>
                ))}
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

