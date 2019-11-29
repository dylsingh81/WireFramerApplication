import React from 'react'
import { connect } from 'react-redux';
import testJson from './TestWireFrameData.json'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom'

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class DatabaseTester extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultUsers: []
        }
    }
    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        for(var i = 0; i < this.state.defaultUsers.length; i++){
            var user =  fireStore.collection('users').doc(this.state.defaultUsers[i]);
            user.update({
                wireFrames: []
            })
        };
        this.state.defaultUsers = [];
    }

    handleReset = () => {
        const fireStore = getFirestore();
        let id = this.props.auth.uid;

        testJson.users.forEach(wireFrameJson => {
            
            this.state.defaultUsers.push(id);

            fireStore.collection('users').doc(id).update({
                key: wireFrameJson.key,
                wireFrames: wireFrameJson.wireFrames,
            }).then(() => {
                console.log("DATABASE RESET");
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    render() {
        const auth = this.props.auth;
        const user = this.props.user;
        
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        //FOR REFRESH ISSUE
        if(!user)
	        return <React.Fragment />
      
        if(user.admin){
            return (
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>)
        }
        return(
            <div className = "flow-text">
                    You do not have administrative privlages to acess this page. 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

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
  )(DatabaseTester);