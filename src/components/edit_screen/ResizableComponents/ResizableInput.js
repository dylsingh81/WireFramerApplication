
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import { Rnd } from "react-rnd";

class ResizableLabel extends Component {

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
        this.props.updateComponent(component, this.props.id);
    }

    onMove = (e, d) => 
    {
        this.setState({ x: d.x, y: d.y })
        let component = this.props.component;
        component.x = d.x;
        component.y = d.y
        this.props.updateComponent(component, this.props.id);
    }

    render() {

        const styleOnClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            cursor: "move",
            zIndex: "1",
            position: "absolute",
        };

        const styleOffClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            cursor: "pointer",
            zIndex: "1",
            position: "absolute",
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
            height: this.props.component.height,
            width: this.props.component.width,
            fontSize: this.props.component.font_size,
            fontColor: this.props.component.font_color,
            borderColor: this.props.component.border_color,
            backgroundColor: this.props.component.background_color,
            borderRadius: this.props.component.border_radius,
            borderWidth: this.props.component.border_width,
            borderStyle: "solid",
            overflow: "hidden",   
        }
    
        const textOffCursorStyle={
            cursor: "pointer",
            height: this.props.component.height,
            width: this.props.component.width,
            fontSize: this.props.component.font_size,
            fontColor: this.props.component.font_color,
            borderColor: this.props.component.border_color,
            backgroundColor: this.props.component.background_color,
            borderRadius: this.props.component.border_radius,
            borderWidth: this.props.component.border_width,
            borderStyle: "solid",
            overflow: "hidden",   
        }

        const resizers={
            zIndex: "0",
        }
    
    
        return (
            <Rnd
                bounds="parent"
                style={this.props.clickedId == this.props.id ? styleOnClick : styleOffClick}
                enableResizing={this.props.clickedId == this.props.id ? resize : resizeOffClick}
                default={{
                    x: 5,
                    y: 5,
                    width: this.props.component.width,
                    height: this.props.component.height,
                }}
                className= {this.props.clickedId == this.props.id ? "resizable" : ""}
                onClick = {this.props.onClick.bind(this, this.props.id)}
                onDrag = {this.props.onDrag.bind(this, this.props.id)}

                size={{ width: this.props.component.width, height: this.props.component.height }}

                position={{ x: this.props.component.x, y: this.props.component.y }}
                scale = {this.props.currentZoom}
                
                onDragStop={this.onMove}
                onResize={this.onResize}
            >
                <input value={this.props.component.text} style={this.props.clickedId == this.props.id ? textOnCursorStyle : textOffCursorStyle} className = "sandbox-control" />
                    <div className='resizers' style = {resizers/* Taken fromhttps://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d*/}>
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