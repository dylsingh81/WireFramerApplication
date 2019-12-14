
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import ResizableComponent from './ResizableComponents/ResizableComponent'

class EditScreenSandbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevZoom: 1,
        }
    }

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
        const wireframe = this.props.wireframe;
        const currentZoom = this.props.currentZoom;
        const update = this.props.update;

        if(currentZoom != this.state.prevZoom){
            this.setState({prevZoom: currentZoom});
            //this.props.updateZoom();
        }

        console.log(wireframe);
        
        let sandboxStyle = {
            height: wireframe.height > 5000 ? "5000px" : wireframe.height + "px",
            width: wireframe.width > 5000 ? "5000px" : wireframe.width + "px",
            transform: "scale( "+ this.props.currentZoom + ")",
        };
        if(wireframe.background_color){

            sandboxStyle = {
                backgroundColor: "rgba(" + wireframe.background_color.r  + "," + 
                                            wireframe.background_color.g  + "," + 
                                            wireframe.background_color.b  + "," + 
                                            wireframe.background_color.a  + ")",
                height: wireframe.height > 5000 ? "5000px" : wireframe.height + "px",
                width: wireframe.width > 5000 ? "5000px" : wireframe.width + "px",
                transform: "scale( "+ this.props.currentZoom + ")",
            };
        }

        const zoomStyle = {
            transform: "scale( "+ this.props.currentZoom + ")",
        };

        return (
            <div className= "zoomable">
                    <div style={sandboxStyle} className="sandbox" onClick = {this.handleSandboxSelected}>
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
                            currentZoom = {currentZoom}
                            update = {update}
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

