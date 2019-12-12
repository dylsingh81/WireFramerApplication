
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class EditScreenHeader extends Component {
    render() {

        return (
            <div className="row no-margin-bottom">
                <div className="input-field bold-text col s6">
                    <label htmlFor="name" className="active">Name</label>
                    <input className="active bold-text" type="text" name="name" onChange={this.handleChange} />
                </div>
                <div className="input-field bold-text col s3">
                    <label htmlFor="width" className="active">Width</label>
                    <input className="active bold-text" type="number" name="width" onChange={this.handleChange} />
                </div>
                <div className="input-field bold-text col s3">
                    <label htmlFor="height" className="active">Height</label>
                    <input className="active bold-text" type="number" name="height" onChange={this.handleChange} />
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        /*  switch(target.id){
                 case "name":
                         this.props.todoList.name = target.value
                     break;
                 case "owner":
                         this.props.todoList.owner = target.value
                     break;                   
                 default: 
                     break;
             }
             
             //Updates firebase database.
             this.props.updateList(this.props.todoList); */
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
)(EditScreenHeader);

