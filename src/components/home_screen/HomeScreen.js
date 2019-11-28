import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
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
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
                    name: "Unknown",
                    owner: "Unknown",
                    items:[],
                    time: new Date(),
            })
            .then((docRef) => {
                    this.setState({redirect: true, redirectID: docRef.id});
                }
            )
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        if (this.state.redirect) {
            this.setState({redirect: false});
            return <Redirect push to={"/todoList/" + this.state.redirectID }/>;
          }

        return (
            <div className="home_screen_container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);