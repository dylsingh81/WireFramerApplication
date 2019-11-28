import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import { editListHandler, removeListHandler } from '../../store/database/asynchHandler'
import ListTrash from './ListTrash.js';
import ListTableHeaders from './ListTableHeaders.js';
import { Link } from 'react-router-dom';

import M  from 'materialize-css';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

    switch(target.id){
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
        this.props.updateList(this.props.todoList);
    }

    openModal = (e)=>
    {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, null);
        M.Modal.getInstance(elems[0]).open();
    }

    deleteList = (e) =>{
        this.props.removeList(this.props.todoList);
    }

    

    handleSortByDescription= (e) =>
    {
        if(!this.checkSorted("description")){
            
            this.props.todoList.items.sort((a ,b) => (a.description > b.description) ? 1:-1);
        }
        else{
            this.props.todoList.items.sort((a ,b) => (a.description < b.description) ? 1:-1);
        }
        this.props.updateList(this.props.todoList);
    }

    handleSortByDueDate= (e) =>
    {
        if(!this.checkSorted("due_date")){
            
            this.props.todoList.items.sort((a ,b) => (a.due_date > b.due_date) ? 1:-1);
        }
        else{
            this.props.todoList.items.sort((a ,b) => (a.due_date < b.due_date) ? 1:-1);
        }
        this.props.updateList(this.props.todoList);
    }

    handleSortByStatus = (e) =>
    {
        if(!this.checkSorted("completed")){
            
            this.props.todoList.items.sort((a ,b) => (a.completed > b.completed) ? 1:-1);
        }
        else{
            this.props.todoList.items.sort((a ,b) => (a.completed < b.completed) ? 1:-1);
        }
        this.props.updateList(this.props.todoList);
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        //FOR REFRESH ISSUE
        if(!todoList)
	        return <React.Fragment />
        //FOR REFRESH ISSUE 

        return (
            <div className="container lime lighten-4 list_screen_container"> 
                <div className = "row no-margin-bottom">
                    <h4 className="grey-text text-darken-3" id="list-title" className="col s11 m11 l11 bold-text"><u>Todo List</u></h4>
                    
                    <ListTrash handleTrashCallback = {this.openModal} className = "col s1 m1 l1 bold-text modal-trigger btn-large blue-grey lighten-2"></ListTrash>
                </div>

                <div className = "row no-margin-bottom">
                    <div className="input-field bold-text">
                        <label htmlFor="name" className="active">Name</label>
                        <input className="active bold-text" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                    </div>
                    <div className="input-field bold-text">
                        <label htmlFor="owner" className="active">Owner</label>
                        <input className="active bold-text" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                    </div>
                </div>                

                <div className = "row no-margin-bottom bold-text">
                    <ListTableHeaders todoList={todoList} handleSortByDescription={this.handleSortByDescription} handleSortByDueDate={this.handleSortByDueDate} handleSortByStatus={this.handleSortByStatus} />
                </div>
                <div className = "row no-margin-bottom">
                    <ItemsList todoList={todoList} />
                </div>

                <div id="modal1" className="modal pink grey">
                    <div className="modal-content">
                        <h4 className="pink lighten-4" id="modal-title">DELETE LIST?</h4>
                        <p>Are you sure you want to delete this list?</p>
                        <p>Note: This CANT be undone!</p>
                    </div>
                    <div className="modal-footer grey lighten-1">
                        <a href="#!" className="modal-close red btn-flat modal-footer-buttons">Cancel</a>
                        <Link to="/" onClick={this.deleteList} className="modal-close green btn-flat modal-footer-buttons">Confirm</Link>
                    </div>
                </div>

            </div>

           
        );
    }

    checkSorted(type){
        let sorted = true
        
        switch(type){
            case "description":
                    for(let i = 0; i<this.props.todoList.items.length-1; i++)
                    {
                        if(this.props.todoList.items[i].description > this.props.todoList.items[i+1].description)
                        {
                            sorted = false;
                            break;
                        }
                    }
                break;
            case "due_date":
                    for(let i = 0; i<this.props.todoList.items.length-1; i++)
                    {
                        if(this.props.todoList.items[i].due_date > this.props.todoList.items[i+1].due_date)
                        {
                            sorted = false;
                            break;
                        }
                    }
                break;
            case "completed":
                    for(let i = 0; i<this.props.todoList.items.length-1; i++)
                    {
                        if(this.props.todoList.items[i].completed > this.props.todoList.items[i+1].completed)
                        {
                            sorted = false;
                            break;
                        }
                    }
                break;
        }

        return sorted;
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  //todoList.id = id;
  
  if(todoList)
    todoList.id = id;

  return {
    todoLists,
    todoList,
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
)(ListScreen);