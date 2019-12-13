
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import ResizableComponent from './ResizableComponents/ResizableComponent'

class EditScreenSandbox extends Component {

    

    handleNoneSelected = (e) =>
    {
        this.props.updateClickedId(-2);
        console.log("handleNoneSelected")

    }

    handleNodeSelected = (id, e) =>
    {       
        this.props.updateClickedId(id);

        console.log("handleNodeSelected");
        e.stopPropagation();
    }
    
    handleSandboxSelected = (e) =>
    {
        this.props.updateClickedId(-1);

        console.log("handleSandboxSelected")
        e.stopPropagation();
    }

    //CHANGE CONTAINER TO OBJECT, THEN IN OBJECT USE TYPE TO RETURN() based on IF, of what you want. * return(<ResizeabkeLabel/>)
    render() {
        const components = this.props.wireframe.components;
        const handleNodeSelected = this.handleNodeSelected;
        const clickedId = this.props.clickedId;
        const updateComponent = this.props.updateComponent
        console.log(this.props);
        return (
            <div className="sandbox-container" onClick={this.handleNoneSelected}>
                <div className="sandbox" onClick = {this.handleSandboxSelected}>
                {components && components.map(function(component, i) {
                    return(
                        <ResizableComponent 
                        onDrag = {handleNodeSelected} 
                        component={component} 
                        type={component.type} 
                        clickedId={clickedId} 
                        onClick = {handleNodeSelected}
                        id={i} 
                        key={i}
                        updateComponent = {updateComponent}
                    />
                    )
                    }
                )}
                </div>
            </div>
        );

    }
}

export default EditScreenSandbox;

