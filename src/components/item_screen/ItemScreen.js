import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import M  from 'materialize-css';
import { Link } from 'react-router-dom';
import { editListHandler, removeListHandler } from '../../store/database/asynchHandler'


class ItemScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            description: "",
            assigned_to: "",
            due_date: "",
            completed: false,
        }

        const item = this.props.item;

        if(!item)
            return;

            this.state.description = item.description;
            this.state.assigned_to = item.assigned_to;
            this.state.due_date = item.due_date;
            this.state.completed = item.completed;
        
    }
    
    render() {
        const todoList = this.props.todoList;
        const item = this.props.item;

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        if (!todoList){
            return <React.Fragment />
        }
        if (!item){
            console.log("No item.")
            return <React.Fragment />
        }
        
        return (
            <div className="container lime lighten-4" id="item-form-container"> 
                <br></br>
                <h4 className="grey-text text-darken-3" className="bold-text"><u>Todo Item</u></h4>
                <br></br>
                <div className="input-field bold-text">
                    <label htmlFor="name" className="active item-prompt-font">Description</label>
                    <input className="active bold-text" type="text" name="description" id="description" onChange={this.handleDescriptionChange} defaultValue={this.state.description}/>
                </div>
                <div className="input-field bold-text">
                    <label htmlFor="assigned_to " className="active item-prompt-font">Assigned To</label>
                    <input className="active bold-text" type="text" name="assigned_to" id="assigned_to" onChange={this.handleAssignedToChange} defaultValue={this.state.assigned_to} />
                </div>
                <div className="input-field bold-text">
                    <label htmlFor="due_date" className="active item-prompt-font">Due Date</label>
                    <input className="bold-text datepicker" type="text" name="due_date" id="due_date" onClick={this.openDate} defaultValue={this.state.due_date}/>

                </div>
                <div className="input-field bold-text">
                    <label htmlFor="completed" className="active item-prompt-font">Completed</label>
                    <p><label>
                    <input className="active bold-text" type="checkbox" onChange ={this.handleCompletedChange} defaultChecked={this.state.completed} />
                    <span id="completed-prompt" ></span></label></p>
                </div>

                <Link to={'/todoList/' + todoList.id}>
                    <button onClick={this.handleSubmit} className="waves-effect waves-light btn item-form-btn purple lighten-1">Submit</button>
                </Link>

                <Link to={'/todoList/' + todoList.id}>
                    <button className="waves-effect waves-light btn item-form-btn purple lighten-1">Cancel</button>
                </Link>
            </div>
        );
    }

    openDate = (e) =>
    {
        var elems = document.querySelectorAll('.datepicker');
        const options = 
        {
            format: "yyyy-mm-dd",
            onClose: this.handleDueDateChange,
        }
        var instances = M.Datepicker.init(elems, options);
        M.Datepicker.getInstance(elems[0]).open();
    }

    handleSubmit = (e) => {
        const todoList = this.props.todoList;
        const item = this.props.item;

        item.description = this.state.description;
        item.assigned_to = this.state.assigned_to;
        item.due_date = this.state.due_date;
        item.completed = this.state.completed;

        if(this.props.item.id == '~'){
            //Add item.
            todoList.items.push(item);
        }

        //console.log(this.props);
        this.props.updateList(todoList);
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleAssignedToChange = (event) => {
        this.setState({assigned_to: event.target.value});
    }

    handleDueDateChange = (event) =>{
        var elems = document.querySelectorAll('.datepicker');
        this.setState({due_date: M.Datepicker.getInstance(elems[0]).open().toString()});
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const { listId } = ownProps.match.params;
    const { itemId } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[listId] : null;

    if (todoList)
        todoList.id = listId;

    let item = null;

    if (itemId != '~')
    {
        item = todoList ? todoList.items[itemId] : null;
        if (item)
            item.id = itemId

        console.log(item);
    }
    else{
        console.log("DAODAODAO")
        item = 
        {
            description: "Unknown",
            assigned_to: "Unknown",
            due_date: "Unknown",
            completed: false,
        };
        if (item)
            item.id = itemId
    }

    console.log(item)


    return {
        todoLists,
        todoList,
        auth: state.firebase.auth,
        item,
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
)(ItemScreen);
