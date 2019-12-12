
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

    constructor() {
        super()
    }

    render() {

        const type = this.props.type;
        const onDrag = this.props.onDrag;
        const clickedId= this.props.clickedId;
        const onClick = this.props.onClick;
        const id= this.props.id;
        switch(type){
            case "container":
                return(<ResizableContainer onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "label":
                return(<ResizableLabel onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "input":
                return(<ResizableInput onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            case "button":
                return(<ResizableButton onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
                break;
            default:
                return(<ResizableContainer onDrag = {onDrag} clickedId={clickedId} onClick = {onClick} id={id}/>);
    }
}


}



const mapStateToProps = (state, ownProps) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null;
    //todoList.id = id;

    const type = ownProps.type;
    const onDrag = ownProps.onDrag;
    const clickedId= ownProps.clickedId;
    const onClick = ownProps.onClick;
    const id= ownProps.id;

    if (user)
        user.id = state.firebase.auth.uid;

    console.log(users);

    return {
        user,
        auth: state.firebase.auth,
        firebase: state.firebase,
        ownProps,
        type,
        onDrag,
        clickedId,
        onClick,
        id,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(ResizableComponent);

