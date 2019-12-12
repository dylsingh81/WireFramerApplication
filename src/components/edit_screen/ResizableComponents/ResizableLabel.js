
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import { Rnd } from "react-rnd";

class ResizableLabel extends Component {

    constructor() {
        super()
    }

    render() {

        console.log(this.props);

        const styleOnClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            cursor: "move"
        };

        const styleOffClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            cursor: "pointer"
        };

        const resize = {
            bottom: false,
            bottomLeft: true,
            bottomRight: true,
            left: false,
            right: false,
            top: false,
            topLeft: true,
            topRight: true
        };

        const resizeOffClick = {
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
        };

        const textOnCursorStyle={
            cursor: "move",
        }

        const textOffCursorStyle={
            cursor: "pointer",
        }

        return (
            <Rnd
                bounds="parent"
                style={this.props.clickedId == this.props.id ? styleOnClick : styleOffClick}
                enableResizing={this.props.clickedId == this.props.id ? resize : resizeOffClick}
                default={{
                    x: 0,
                    y: 0,
                }}
                className= {this.props.clickedId == this.props.id ? "resizable" : ""}
                onClick = {this.props.onClick.bind(this, this.props.id)}
                onDrag = {this.props.onDrag.bind(this, this.props.id)}
            >
            <label style={this.props.clickedId == this.props.id ? textOnCursorStyle : textOffCursorStyle}>DDD</label>
                <div className='resizers'>
                    <div className='resizer top-left'></div>
                    <div className='resizer top-right'></div>
                    <div className='resizer bottom-left'></div>
                    <div className='resizer bottom-right'></div>
                </div>
            </Rnd>
        )
    }


}

export default ResizableLabel;