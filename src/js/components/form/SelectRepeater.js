import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Selectbox from './Selectbox'
import Repeater from './Repeater'



export default class SelectboxRepeater extends Component {

	onChange = (value) => {
		this.props.onChange(value);
	}

	render() {
		return (	
			<div className="field__select-repeater">
				<Repeater onChange={this.onChange} items={this.props.value}>
				  <Selectbox
	          helpText="" 
	          label="Content item" 
	          items={this.props.items}
	          search={true}
	          allowCustomText={false}
	          showComplex={true}
	          inputPlaceholder="Start typing the title of the content item"/>
				</Repeater>
			</div>
		);
	}
}
