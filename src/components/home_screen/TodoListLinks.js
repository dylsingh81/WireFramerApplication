import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';

import { editListHandler, removeListHandler } from '../../store/database/asynchHandler'
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    render() {
        const todoLists = this.props.todoLists;

        if(todoLists){
            console.log("Sorting: ", todoLists)
            todoLists.sort((a ,b) => (a.time < b.time) ? 1:-1);
        }

        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={this.updateTime.bind(this, todoList)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }

    updateTime = (todoList, e) =>{
        this.props.updateList(todoList);

    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    updateList: todoList => dispatch(editListHandler(todoList)),
    removeList: todoList => dispatch(removeListHandler(todoList)),
  });
  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(TodoListLinks);