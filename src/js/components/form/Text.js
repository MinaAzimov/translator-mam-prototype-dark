import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';




export default class Text extends Component {

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
				<label className="field__label">
					{this.props.label }
				</label>
				<input
					className="field-text__input"
					ref={input => {
						if (this.props.refCb) {
							this.props.refCb(input);
						}
						this.input = input;
					}}
					type="text"
					onChange={this.onChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					disabled={isLocked || disabled}
					value={value}
					placeholder={this.props.placeholder}
				/>
				{
					characterLimit !== null ?
						<div className="field-text__character-count">{ccount}/{characterLimit}</div>
					:
						null
				}

				<div className="field__error"></div>
				{this.props.helpText &&
					<div className="field__help-text__container">
						<i className="iconcss icon-info"></i>
						<div className="field__help-text">{this.props.helpText}</div>
					</div>
				}
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
