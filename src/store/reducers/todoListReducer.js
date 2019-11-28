import * as actionCreators from '../actions/actionCreators'


const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case actionCreators.EDIT_TODO_LIST:
            console.log("Edit reducer!")
            return {
                ...state
            };

        case actionCreators.REMOVE_TODO_LIST:
            console.log("Reducer")
            return{
                ...state
            } 
            
        default:
            return state;
    }
};

export default todoListReducer;