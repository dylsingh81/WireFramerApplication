import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireFrameLinks from './WireFrameLinks'
import { getFirestore } from 'redux-firestore';
import DeleteWFModal from './DeleteWFModal';
import { editWireframeHandler } from '../../store/database/asynchHandler';


class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            redirectID: "",
        };
    }

    
    handleNewList = () =>
    {
        const user = this.props.user;
        console.log(user);
        var newWF = {
            key: user.wireFrames.length-1,
			name: "Unknown",
		    width: 500,
            height: 600,
            background_color: {
                "r": "245",
                "g": "245",
                "b": "245",
                "a": "1"
            },
            components: [],
            time: new Date(), 
        };
        
        user.wireFrames.push(newWF);
        console.log(user.wireFrames);
        this.setState({redirect: true, redirectID: user.wireFrames.length-1});

        const fireStore = getFirestore();
        var onlineUser =  fireStore.collection('users').doc(this.props.auth.uid);
            onlineUser.update({
                wireFrames: user.wireFrames,
            })
    }

    deleteList = (e) =>{
        
        this.props.user.wireFrames.splice(this.props.index, 1);
        this.props.updateWF(this.props.user);
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        if (this.state.redirect) {
            this.setState({redirect: false});
            return <Redirect push to={"/wireframe/" + this.state.redirectID }/>;
          }

        return (
            <div className="home_screen_container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireFrameLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @WireFramer<br />
                            Application
                        </div>
                        
                        <div className="home_new_list_container">
                            <br></br>
                                <button className="waves-effect waves-light btn  indigo lighten-1 home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                    <DeleteWFModal deleteList = {this.deleteList}/>
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

const mapDispatchToProps = dispatch => ({
    updateWF: user => dispatch(editWireframeHandler(user)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(HomeScreen);