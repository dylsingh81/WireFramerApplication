import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { editListHandler, removeListHandler } from '../../store/database/asynchHandler'
import { Link } from 'react-router-dom';


class ItemsList extends React.Component {
    state={

    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;

        const removeItem = this.removeItem;
        const moveDown = this.moveDown
        const moveUp = this.moveUp
        const editItem = this.editItem
        const stopProp = this.stopProp

        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item, i) {
                    item.id = i
                    return (
                        <Link to={'/todoItem/' + todoList.id + '/' + item.id}>
                            <ItemCard editItem={editItem} stopProp = {stopProp} todoList={todoList} item={item} key={item.id} removeItem={removeItem} moveDown={moveDown} moveUp={moveUp} />
                        </Link>
                    );})
                }
                <Link to={"/todoItem/" + todoList.id + '/~'} onClick={this.deleteList} className="btn pmd-btn-fab pmd-ripple-effect btn-primary" id="add_item_button"><i className="material-icons pmd-sm">add_circle</i></Link>         
            </div>
        );
    }

    editItem = (item, e) =>
    {
        console.log("Edit Item", "Clicked on: ", item)
    }

    removeItem = (item, e) =>
    {
        e.stopPropagation()
        this.props.todoList.items.splice(item.id, 1);
        this.props.updateList(this.props.todoList);
    }
    
    stopProp = (e) =>
    {
        e.stopPropagation();
    }

    moveUp = (listItem, e) =>
    {
        e.stopPropagation();
        let arr = this.props.todoList.items;
        var index = listItem.id
        let temp = arr[index];
        arr[index] = arr[index-1];
        arr[index-1] = temp;

        
        this.props.todoList.items = arr;
        this.props.updateList(this.props.todoList);
    }
    moveDown = (listItem , e) =>
    {
        e.stopPropagation()
        let arr = this.props.todoList.items;
        var index = listItem.id
        let temp = arr[index];
        arr[index] = arr[index+1];
        arr[index+1] = temp;
        
        this.props.todoList.items = arr;
        this.props.updateList(this.props.todoList);
    }

}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    updateList: todoList => dispatch(editListHandler(todoList)),
  });
  


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);
