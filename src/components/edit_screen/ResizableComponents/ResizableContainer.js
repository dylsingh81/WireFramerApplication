
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import { Rnd } from "react-rnd";

class ResizableContainer extends Component {

    onResize = (e, direction, ref, delta, position) => {
        this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
        });
        let component = this.props.component;
        component.x = position.x;
        component.y = position.y;
        component.height = this.state.height;
        component.width = this.state.width;
        this.props.updateComponent(component);
    }

    onMove = (e, d) => 
    {
        this.setState({ x: d.x, y: d.y })
        let component = this.props.component;
        component.x = d.x;
        component.y = d.y;
        this.props.updateComponent(component);
    }

    render() {

        console.log(this.props);

        const styleOnClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
            position: "absolute",
            cursor: "move"
        };

        const styleOffClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
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


        return (
            <Rnd
                bounds="parent"
                style={this.props.clickedId == this.props.id ? styleOnClick : styleOffClick}
                enableResizing={this.props.clickedId == this.props.id ? resize : resizeOffClick}
                default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200
                }}
                className= {this.props.clickedId == this.props.id ? "resizable" : ""}
                onClick = {this.props.onClick.bind(this, this.props.id)}
                onDrag = {this.props.onDrag.bind(this, this.props.id)}

                size={{ width: this.props.component.width, height: this.props.component.height }}

                position={{ x: this.props.component.x, y: this.props.component.y }}
                
                onDragStop={this.onMove}
                onResize={this.onResize}

            >
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

export default ResizableContainer;