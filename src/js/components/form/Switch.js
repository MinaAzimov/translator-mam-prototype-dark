import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';




export default class Switch extends Component {

  constructor() {
    super();
  }

  selectOption(index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  toggle = () => {
  	if (this.props.onChange) {
      this.props.onChange(!this.props.value);
    }
  }

  render() {
    const { value, label } = this.props;
    const classnames = classNames({
    	'switch': true,
    	'switch--on': value === true
    });
    return (
      <div className="switch-wrapper">
        <div className={classnames} onClick={this.toggle}>
        	<div className="switch-toggle"></div>
          <label>{label}</label>
        </div>
      </div>
    )
  }
}
