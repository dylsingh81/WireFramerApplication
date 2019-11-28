
  
// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListTrash extends Component {
    handleTrash = () => {
        // CALL THE CALLBACK METHOD IN THE PARENT COMPONENT
        this.props.handleTrashCallback();
    }

    render() {
        // DISPLAY WHERE WE ARE
        return (
            <h5 id="list_trash"
                onClick={this.handleTrash}
                className={this.props.className}
            >
                &#128465;
            </h5>
        )
    }
}

export default ListTrash