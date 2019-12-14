
import React, { Component } from 'react';

class EditScreenHeader extends Component {
    render() {
        const wireframe = this.props.wireframe;
        return (
            <div className="row no-margin-bottom">
                <div className="input-field bold-text col s6">
                    <label htmlFor="name" className="active">Name</label>
                    <input value = {wireframe.name} className="active bold-text" type="text" name="name" id="name" onChange={this.props.handleChange} />
                </div>
                <div className="input-field bold-text col s3">
                    <label htmlFor="width" className="active">Width (px)</label>
                    <input value = {wireframe.width} className="active bold-text" type="number" name="width" id="width" onChange={this.props.handleChange} />
                </div>
                <div className="input-field bold-text col s3">
                    <label htmlFor="height" className="active">Height (px)</label>
                    <input value = {wireframe.height} className="active bold-text" type="number" name="height" id="height"onChange={this.props.handleChange} />
                </div>
            </div>
        );
    }
}

export default EditScreenHeader;

