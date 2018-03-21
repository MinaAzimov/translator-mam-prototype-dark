import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import classNames from 'classnames';


export default class MultiSelectbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    selectProps: PropTypes.object
  };

  static defaultProps = {
    selectProps: {},
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

  componentDidUpdate(prevProps) {
    // Got kicked out
    if (!prevProps.isLocked && this.props.isLocked) {
      this.refs.input.blur();
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

  onChange = (tags) => {
    const newVal = tags.map(tag => tag.value);
    this.setState({
      value: newVal
    });
    this.props.onChange(newVal);
  };

  onFocus = (e) => {
    this.setState({ focused: true });
    this.props.onStartEdit();
  };

  onBlur = (e) => {
    this.setState({ focused: false });
    this.props.onStopEdit();
  };

  render() {
    let { onChange, selectProps, isLocked, imEditing, editor, options } = this.props;
    let value = editor && this.state.value ? this.state.value : this.props.value;
    let classnames = classNames({
      'field-text field--multi-selectbox': true,
      'field__not-empty': Array.isArray(value) ? !!value.length : value,
      'field__focused': this.state.focused
    });
    return (
      <div className={classnames}>
        <label className="field__label">
          {this.props.label }
        </label>
        <Select
          multi={true}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          options={options.map(tagTitle => ({'value': tagTitle, 'label': tagTitle}))}
          value={value}
          disabled={isLocked}
          {...selectProps}
        />
        <div className="field__error"></div>
        <div className="field__help-text">{this.props.helpText}</div>
        {
          isLocked ?
            <div className={"field__locked-msg theme-color-background-" + editor.colorProfile}>
              <i className="fa fa-lock" ></i>
              {editor.name} is current editing
            </div>
            :
            ""
        }
      </div>
    )
  }
}