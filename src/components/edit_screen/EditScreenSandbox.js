
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import ResizableComponent from './ResizableComponents/ResizableComponent'

class EditScreenSandbox extends Component {
    
    constructor() {
        super()
        this.state = {
            clickedId: -2,
            components: [
                {
                    key: 0,
                    type: "label",
                    text: "Homepage Template",
                    left: "5px",
                    top: "5px",	
                    width: "20px",
                    height: "5px",
                    fontSize: "12px",
                    fontColor: "black",
                    borderColor: "blue",
                    backgroundColor: "gray",
                    borderRadius: "2px",
                },
                {
                    key: 1,
                    type: "button",
                    text: "Submit",
                    left: "5px",
                    top: "5px",	
                    width: "20px",
                    height: "5px",
                    fontSize: "12px",
                    fontColor: "black",
                    borderColor: "blue",
                    backgroundColor: "gray",
                    borderRadius: "2px",
                }
            ],
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

    //CHANGE CONTAINER TO OBJECT, THEN IN OBJECT USE TYPE TO RETURN() based on IF, of what you want. * return(<ResizeabkeLabel/>)
    render() {
        const components = this.props.wireframe.components;
        console.log(this.props);
        return (
            <div className="sandbox-container" onClick={this.handleNoneSelected}>
                <div className="sandbox" onClick = {this.handleSandboxSelected}>
                {components && components.map(component => (
                    <ResizableComponent 
                    onDrag = {this.handleNodeSelected} 
                    component={component} 
                    type={component.type} 
                    clickedId={this.state.clickedId} 
                    onClick = {this.handleNodeSelected}
                    id={component.key} 
                    key={component.key}
                    updateComponent = {this.props.updateComponent}
                    />
                ))}
                </div>
            </div>
        );

    }
}

export default EditScreenSandbox;

