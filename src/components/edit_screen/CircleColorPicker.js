'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

//Taken from https://casesandberg.github.io/react-color/#examples


class CircleColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '0',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.props.handleColorChange(color);
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '20px',
          height: '20px',
          borderRadius: '10px',
          backgroundColor: "rgba(" + this.props.color.r  + "," + this.props.color.g  + "," +  this.props.color.b  + "," + this.props.color.a  + ")",
        },
        swatch: {
          padding: '0px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div className="color-picker" id = {this.props.id}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.props.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default CircleColorPicker