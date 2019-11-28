// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListTableHeaders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // DISPLAY WHERE WE ARE
        return(
            <div className="card z-depth-4 row no-margin-bottom  blue-grey lighten-2" id="table_headers">
                <div className="col s3 sort-btn" onClick={this.props.handleSortByDescription}>Task</div>
                <div className="col s3 sort-btn" onClick={this.props.handleSortByDueDate}>Due Date</div>
                <div className="col s3 sort-btn" onClick={this.props.handleSortByStatus}>Status</div>
            </div>
        )
    }
}

export default ListTableHeaders;