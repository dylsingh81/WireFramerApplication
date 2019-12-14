import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';

import { editWireframeHandler } from '../../store/database/asynchHandler';
import WireFrameCard from './WireFrameCard';

class WireframeLinks extends React.Component {
    
    updateTime = (wireframe, i, e) =>{
        const user = this.props.user;
        const wireFrames = user.wireFrames;
        console.log("Clicked on", wireFrames[wireframe.key]);
        wireFrames[i].time = new Date();
        this.props.updateWF(this.props.user);

    }

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
                
                {wireFrames && wireFrames.map((wireFrame, i) => (
                    <Link to={'/wireframe/' + i} key={i} onClick={this.updateTime.bind(this, wireFrame, i)}>
                        <WireFrameCard wireFrame={wireFrame} />
                    </Link>
                ))}
            </div>
        );

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



const mapDispatchToProps = dispatch => ({
    updateWF: user => dispatch(editWireframeHandler(user)),
});


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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
