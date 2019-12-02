
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import ResizableRect from 'react-resizable-rotatable-draggable'

class EditScreenSandbox extends Component {

    constructor() {
        super()
        this.state = {
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            controls: "",
        }
    }

    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        this.setState({
            top,
            left,
            width,
            height
        })
    }

    handleRotate = (rotateAngle) => {
        this.setState({
            rotateAngle
        })
    }

    handleDrag = (deltaX, deltaY) => {
        this.setState({
            left: this.state.left + deltaX,
            top: this.state.top + deltaY
        })
    }

    handleClick = (e) =>{
        //Show controls if inside clicked
        console.log(this.props.node)
        if(this.props.node.contains(e.target))
        {
            this.setState({
                controls: 'nw, ne, se, sw',
            })
            return;
        }
        this.setState({
            controls: '',
        })    
    }

    componentWillMount()
    {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount()
    {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    
    render() {
        const {width, top, left, height, controls} = this.state

        return (
                <ResizableRect
                    left={left}
                    top={top}
                    width={width}
                    height={height}
                        // aspectRatio={false}
                    // minWidth={10}
                    // minHeight={10}
                    zoomable={controls}
                    rotatable={false}
                    // onRotateStart={this.handleRotateStart}
                    onRotate={this.handleRotate}
                    // onRotateEnd={this.handleRotateEnd}
                    // onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    // onResizeEnd={this.handleUp}
                    // onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    // onDragEnd={this.handleDragEnd}
                />
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

