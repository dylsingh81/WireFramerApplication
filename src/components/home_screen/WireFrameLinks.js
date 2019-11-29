import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';

import { editListHandler, removeListHandler } from '../../store/database/asynchHandler'
import WireFrameCard from './WireFrameCard';

class WireframeLinks extends React.Component {
    render() {

        const user = this.props.user;
        if (!user)
            return <React.Fragment />
        const wireFrames = user.wireFrames;


        //FOR REFRESH ISSUE

        if(wireFrames){
            console.log("Sorting: ", wireFrames);
            wireFrames.sort((a ,b) => (a.time < b.time) ? 1:-1);
        }

        console.log(wireFrames);
        return (
            <div className="red">
                {wireFrames && wireFrames.map(wireFrame => (
                    <Link to={'/wireframe/' + wireFrame.key} key={wireFrame.key} onClick={this.updateTime.bind(this, wireFrames)}>
                        <WireFrameCard wireFrame={wireFrame} />
                    </Link>
                ))}
            </div>
        );

    }
    updateTime() {
        return;
    }
}

const mapStateToProps = (state, ownProps) => {

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
)(WireframeLinks);

/* const mapDispatchToProps = dispatch => ({
    updateList: todoList => dispatch(editListHandler(todoList)),
    removeList: todoList => dispatch(removeListHandler(todoList)),
  });


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(TodoListLinks); */
