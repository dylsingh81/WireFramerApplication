
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import EditScreenHeader from './EditScreenHeader'
import EditScreenSandbox from './EditScreenSandbox'
import AddControlBar from './AddControlBar'
import EditControlBar from './EditControlBar'
import { editWireframeHandler } from '../../store/database/asynchHandler';

class EditScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saved: false,
            currentWF: null,
            clickedId: -2,
            isComponent: false,
        }
    }

    updateComponent = (component, id) => {
        console.log("Update component: ");
        this.props.wireframe.components[id] = component;
    }

    saveWF = (e) => {
        this.props.updateWF(this.props.user);
    }

    addContainer = (e) => {
        let newContainer = {
            "key": this.props.wireframe.components.length,
            "type": "container",
            "text": "",
            "x": 5,
            "y": 5,
            "width": "100px",
            "height": "100px",
            "font_size": "12px",
            "font_color": "black",
            "border_color": "black",
            "background_color": "transparent",
            "border_radius": "2px",
            "border_width": "1px",
        }
        this.props.wireframe.components.push(newContainer);
        this.forceUpdate();
    }

    addLabel = (e) => {
        let newLabel = {
            "key": this.props.wireframe.components.length,
            "type": "label",
            "text": "Prompt for input",
            "x": 5,
            "y": 5,
            "width": "85px",
            "height": "30px",
            "font_size": "12px",
            "font_color": "black",
            "border_color": "blue",
            "background_color": "gray",
            "border_radius": "2px",
            "border_width": "1px",
        }
        this.props.wireframe.components.push(newLabel);
        this.forceUpdate();
    }

    addButton = (e) => {
        let newButton = {
            "key": this.props.wireframe.components.length,
            "type": "button",
            "text": "",
            "x": 5,
            "y": 5,
            "width": "85px",
            "height": "30px",
            "font_size": "12px",
            "font_color": "black",
            "border_color": "blue",
            "background_color": "gray",
            "border_radius": "2px",
            "border_width": "1px",
        }
        this.props.wireframe.components.push(newButton);
        this.forceUpdate();
    }

    addInput = (e) => {
        let newInput = {
            "key": this.props.wireframe.components.length,
            "type": "input",
            "text": "Input...",
            "x": 5,
            "y": 5,
            "width": "85",
            "height": "30px",
            "font_size": "12px",
            "font_color": "black",
            "border_color": "black",
            "background_color": "white",
            "border_radius": "2px",
            "border_width": "1px",
        }
        this.props.wireframe.components.push(newInput);
        this.forceUpdate();
    }

    updateClickedId = (clickedId, e) => {
        this.setState({
            clickedId: clickedId,
        })
        if (clickedId >= 0) {
            this.setState({
                isComponent: true,
            })
        }
        else {
            this.setState({
                isComponent: false,
            })
        }
    }

    handleKeyDown = (e) => {

        if (this.state.clickedId < 0)
            return;

        if (e.keyCode === 46) {
            //e.preventDefault();
            console.log('DEL pressed');
            console.log(this.props.wireframe.components)
            const index = this.state.clickedId;
            this.setState({
                clickedId: -2,
                isComponent: false,
            })
            this.props.wireframe.components.splice(index, 1);
            console.log(this.props.wireframe.components)
            this.forceUpdate();
        }
        else if (e.keyCode === 68 && e.ctrlKey) {
            e.preventDefault();
            console.log('CTRL + D pressed');
            const index = this.state.clickedId;
            console.log(this.props.wireframe.components)

            const sourceControl = this.props.wireframe.components[index]
            const destControl = {
                "key": 0,
                "type": "",
                "text": "",
                "x": 0,
                "y": 0,	
                "width": "",
                "height": "",
                "font_size": "",
                "border_color": "",
                "background_color": "",
                "border_radius": "",
                "border_width": ""
            };
            //console.log(sourceControl);
            const returnedTarget = Object.assign(destControl, sourceControl);
            returnedTarget.x += 100;
            returnedTarget.y += 100;
            returnedTarget.key = this.props.wireframe.components.length;
            this.props.wireframe.components.push(returnedTarget);
            //console.log(returnedTarget);
            console.log(this.props.wireframe.components)

            this.forceUpdate();
        }
        else {
            return;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    getClickedComponent(clickedId) {
        if (clickedId >= 0)
            return this.props.wireframe.components[this.state.clickedId]
        else
            return this.props.wireframe
    }

    update = (e) => {
        this.forceUpdate();
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        console.log(this.state);

        return (
            <div className="edit-screen">
                <div>
                    <EditScreenHeader />
                </div>
                <div className="row">
                    <div className="col no-padding">
                        <AddControlBar
                            addContainer={this.addContainer}
                            addLabel={this.addLabel}
                            addButton={this.addButton}
                            addInput={this.addInput}
                            saveWF={this.saveWF} />

                    </div>
                    <div className="col no-padding">
                        <EditScreenSandbox updateClickedId={this.updateClickedId} clickedId={this.state.clickedId} updateComponent={this.updateComponent} wireframe={this.props.wireframe} />
                    </div>
                    <div className="col no-padding">
                        <EditControlBar update={this.update} clickedComponent={this.getClickedComponent(this.state.clickedId)} isComponent={this.state.isComponent} />
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null;
    //todoList.id = id;

    const frameId = ownProps.match.params.frameId;
    let wireframe = []
    if (user) {
        user.id = state.firebase.auth.uid;
        const wireframes = user.wireFrames;
        wireframe = wireframes[frameId]
    }

    return {
        user,
        auth: state.firebase.auth,
        firebase: state.firebase,
        wireframe,
    };
};

const mapDispatchToProps = dispatch => ({
    updateWF: user => dispatch(editWireframeHandler(user)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(EditScreen);

