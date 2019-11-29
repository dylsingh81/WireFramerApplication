import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireFrameLinks from './WireFrameLinks'
import { getFirestore } from 'redux-firestore';

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
            key: user.wireFrames.length,
			name: "Unknown",
		    width: "1000px",
			height: "1000px",
            containers: [],
            time: new Date(), 
        };

        user.wireFrames.push(newWF);

        this.setState({redirect: true, redirectID: user.wireFrames.length});

        const fireStore = getFirestore();
        var onlineUser =  fireStore.collection('users').doc(this.props.auth.uid);
            onlineUser.update({
                wireFrames: user.wireFrames,
            })
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
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
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
)(HomeScreen);