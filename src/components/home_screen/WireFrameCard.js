import React from 'react';

class WireFrameCard extends React.Component {

    render() {
        const { wireFrame } = this.props;
        console.log("TodoListCard, todoList.id: " + wireFrame.key);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireFrame.name}</span>
                </div>
            </div>
        );
    }
}
export default WireFrameCard;