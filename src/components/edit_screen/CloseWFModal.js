import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class CloseWFModal extends Component {
    render() {
        const wireframe = this.props.wireframe;
        return (
             <div id="modal1" className="modal grey">
                    <div className="modal-content">
                        <h4 className="black lighten-4" id="modal-title">EXIT WITHOUT SAVING WIREFRAME?</h4>
                        <p>Are you sure you want to exit without saving?</p>
                        <p>Note: You will lose the change's you have made!</p>
                    </div>
                    <div className="modal-footer grey lighten-1">
                        <a href="#!" className="modal-close red btn-flat modal-footer-buttons">Cancel</a>
                        <Link to="/" className="modal-close green btn-flat modal-footer-buttons">Yes, Exit Without Saving</Link>
                    </div>
                </div>
        );
    }
}

export default CloseWFModal;

