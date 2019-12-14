
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
        this.props.updateComponent(component, this.props.id);
    }

    onMove = (e, d) => 
    {
        this.setState({ x: d.x, y: d.y })
        let component = this.props.component;
        component.x = d.x;
        component.y = d.y;
        this.props.updateComponent(component, this.props.id);
    }

    render() {
        const styleOnClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
            position: "absolute",
            cursor: "move",
            fontSize: this.props.component.font_size,
            color: "rgba(" + this.props.component.font_color.r  + "," + 
                                this.props.component.font_color.g  + "," + 
                                this.props.component.font_color.b  + "," + 
                                this.props.component.font_color.a  + ")",

            borderColor: "rgba(" + this.props.component.border_color.r  + "," + 
                                    this.props.component.border_color.g  + "," + 
                                    this.props.component.border_color.b  + "," + 
                                    this.props.component.border_color.a  + ")",

            backgroundColor: "rgba(" + this.props.component.background_color.r  + "," + 
                                    this.props.component.background_color.g  + "," + 
                                    this.props.component.background_color.b  + "," + 
                                    this.props.component.background_color.a  + ")",
            borderRadius: this.props.component.border_radius,
            borderWidth: this.props.component.border_width,
            borderStyle: "solid",
        }

        const styleOffClick = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
            position: "absolute",
            cursor: "pointer",
            fontSize: this.props.component.font_size,
            color: "rgba(" + this.props.component.font_color.r  + "," + 
                                this.props.component.font_color.g  + "," + 
                                this.props.component.font_color.b  + "," + 
                                this.props.component.font_color.a  + ")",

            borderColor: "rgba(" + this.props.component.border_color.r  + "," + 
                                    this.props.component.border_color.g  + "," + 
                                    this.props.component.border_color.b  + "," + 
                                    this.props.component.border_color.a  + ")",

            backgroundColor: "rgba(" + this.props.component.background_color.r  + "," + 
                                    this.props.component.background_color.g  + "," + 
                                    this.props.component.background_color.b  + "," + 
                                    this.props.component.background_color.a + ")",
            borderRadius: this.props.component.border_radius,
            borderWidth: this.props.component.border_width,
            borderStyle: "solid",
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
                scale = {this.props.currentZoom}
                onDragStop={this.onMove}
                onResize={this.onResize}

            >
                <div className='resizers'/* Taken fromhttps://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d*/>
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