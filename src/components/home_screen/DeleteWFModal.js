import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class DeleteWFModal extends Component {
    render() {
        const wireframe = this.props.wireframe;
        return (
             <div id="modal2" className="modal grey">
                    <div className="modal-content">
                        <h4 className="purple lighten-4" id="modal-title">DELETE WIREFRAME?</h4>
                        <p>Are you sure you want to delete this WireFrame?</p>
                        <p>Note: This CANT be undone!</p>
                    </div>
                    <div className="modal-footer grey lighten-1">
                        <a href="#!" className="modal-close red btn-flat modal-footer-buttons">Cancel</a>
                        <button onClick={this.props.deleteList} className="modal-close green btn-flat modal-footer-buttons">Confirm</button>
                    </div>
                </div>
        );
    }
}

export default DeleteWFModal;

