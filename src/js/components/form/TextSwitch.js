import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';




export default class TextToggle extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

  static defaultProps = {
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

	componentDidUpdate(prevProps) {
		// Got kicked out
		if (!prevProps.isLocked && this.props.isLocked) {
			this.input.blur();
		}
	}

	componentWillUpdate(nextProps) {
		// If the value changes from not me
		if (nextProps.imEditing !== this.props.imEditing) {
			this.setState({
				value: ''
			})
		}
	}

	onChange = (index) => {
		this.props.onChange(index);
	};

	onFocus = (e) => {
		this.setState({ focused: true });
		if (this.props.onStartEdit) {
			this.props.onStartEdit();
		}
	};

	onBlur = (e) => {
		this.setState({ focused: false });
		if (this.props.onStopEdit) {
			this.props.onStopEdit();
		}
	};

	focus() {
		this.input.focus();
	}

	input = null;

	render() {

		let { onChange, isLocked, disabled, imEditing, editor, options, value } = this.props;

		return (
			<div className="field-texttoggle">
				<label className="field-texttoggle__label">
					{this.props.label }
				</label>
				<div className="field-texttoggle__list">
					{
						options.map((option,index) => {
							let classnames = classNames({
								'field-texttoggle__item': true,
								'field-texttoggle__item--selected': index === value
							});
							return (

								<div className={classnames} onClick={this.onChange.bind(this, index)} key={index}>
									{ option }
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

Text.defaultProps = {
	onChange: null,
	isLocked: null,
	disabled: false,
	imEditing: false,
	editor: null,
	characterLimit: null
}
