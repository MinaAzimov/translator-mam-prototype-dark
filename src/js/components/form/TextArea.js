import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';




export default class TextArea extends Component {

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

	onChange = (e) => {
		let newVal = e.target.value;
		this.setState({
			value: newVal
		});
		if (this.props.onChange) {
			this.props.onChange(newVal);
		}
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
		let { onChange, isLocked, disabled, imEditing, editor, characterLimit } = this.props;
		let value = this.state.value ? this.state.value : this.props.value;
		let ccount = value ? value.length : 0;
		let classnames = classNames({
			'field-text': true,
			'field__not-empty': value,
			'field__focused': this.state.focused,
			'field__disabled': this.props.disabled,
			'field-text--exceeded-limit': characterLimit !== null && ccount > characterLimit
		});


		return (
			<div className={classnames}>
				<textarea
					value={value}
					className="field-textarea__input"
					onChange={this.onChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					disabled={isLocked || disabled}
					placeholder={this.props.placeholder}
				/>
				{
					isLocked ?
						<div className={"field__locked-msg theme-color-background-" + editor.colorProfile}>
							<i className="fa fa-lock" ></i>
							{editor.name} is currently editing
						</div>
					:
						""
				}
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
