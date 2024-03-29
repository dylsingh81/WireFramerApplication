
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import { Rnd } from "react-rnd";
import ResizableContainer from './ResizableContainer';
import ResizableLabel from './ResizableLabel';
import ResizableInput from './ResizableInput';
import ResizableButton from './ResizableButton';

class ResizableComponent extends Component {


    render() {

        const type = this.props.type;
        const onDrag = this.props.onDrag;
        const clickedId= this.props.clickedId;
        const onClick = this.props.onClick;
        const id= this.props.id;
        const component = this.props.component;
        const updateComponent = this.props.updateComponent
        const currentZoom = this.props.currentZoom;
        const update = this.props.update;
        switch(type){
            case "container":
                return(<ResizableContainer update = {update} currentZoom = {currentZoom} updateComponent = {updateComponent} component={component} onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "label":
                return(<ResizableLabel update = {update} currentZoom = {currentZoom} updateComponent = {updateComponent} component={component} onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "input":
                return(<ResizableInput update = {update} currentZoom = {currentZoom} updateComponent = {updateComponent} component={component} onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "button":
                return(<ResizableButton update = {update} currentZoom = {currentZoom} updateComponent = {updateComponent} component={component} onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            default:
    }
}


}


export default ResizableComponent;

