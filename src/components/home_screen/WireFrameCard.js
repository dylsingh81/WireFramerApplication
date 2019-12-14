import React from 'react';

import M  from 'materialize-css';


class WireFrameCard extends React.Component {

    handleDeleteList= (e) =>
    {
        e.stopPropagation();
        e.preventDefault();
        this.openDeleteWFModal();
    }

    openDeleteWFModal = (e)=>
    {
        var elems = document.querySelectorAll('#modal2');
        var instances = M.Modal.init(elems, null);
        M.Modal.getInstance(elems[0]).open();
    }

    render() {
        const { wireFrame } = this.props;
        return (
            <div className="wf-card card z-depth-3  blue-grey lighten-3">
                <div className="row card-content black-text text-darken-3">
                    <span className="card-title col s10">{wireFrame.name}</span>
                    <button onClick={this.handleDeleteList} className="col s2 z-depth-4 material-icons waves-effect waves-light btn-small purple lighten-2">clear</button>
                </div>
            </div>
        );
    }
}

export default WireFrameCard;