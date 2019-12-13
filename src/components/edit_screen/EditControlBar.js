
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import CircleColorPicker from './CircleColorPicker.js';


class EditControlBar extends Component {

    handleBackgroundColorChange = (color) =>
    {
        const component = this.props.clickedComponent;
        this.props.clickedComponent.background_color = color.hex;
        this.props.update();
    }

    handleBorderColorChange = (color) =>
    {
        const component = this.props.clickedComponent;
        this.props.clickedComponent.border_color = color.hex;
        this.props.update();
    }

    render() {
        const component = this.props.clickedComponent;
        
        const defaultColor= {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
          };

        return (
            <div className="menu" id="edit-ctrl">
                <div className="properties-label">
                    <label htmlFor="properties" className="active edit-label">Properties</label>
                    <hr/>
                    <input value= {this.props.isComponent ? component.text: ""} className="active bold-text edit-field" type="text" name="properties" />
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Font Size:</label>
                    <input 
                        value = {this.props.isComponent ? parseInt(component.font_size.substring(0, (component.font_size.length)-2)) : ""} 
                        disabled = {!this.props.isComponent}
                        type="number" id="font-size-input" 
                        className="custom-input edit-field" min="1" max="99"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Background Color:</label>
                    <CircleColorPicker handleColorChange = {this.handleBackgroundColorChange} color= {component.background_color ? component.background_color : defaultColor} id="background-color-input"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Border Color:</label>
                    <CircleColorPicker handleColorChange = {this.handleBorderColorChange} color= {component.border_color ? component.border_color : defaultColor} id="border-color-input"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Border Thickness:</label>
                    <input 
                        type="number" id="border-thick-input" 
                        value = {component.border_width ? parseInt(component.border_width.substring(0, (component.border_width.length)-2)) : ""} 
                        className="custom-input edit-field" min="1" max="99"/>
                </div>
                <hr/>
                <div>
                    <label className="edit-label">Border Radius:</label>
                    <input 
                        type="number" id="border-rad-input" 
                        value = {component.border_radius ? parseInt(component.border_radius.substring(0, (component.border_radius.length)-2)) : ""} 
                        className="custom-input edit-field" min="1" max="99"/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null;
    //todoList.id = id;

    if (user)
        user.id = state.firebase.auth.uid;

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
)(EditControlBar);

