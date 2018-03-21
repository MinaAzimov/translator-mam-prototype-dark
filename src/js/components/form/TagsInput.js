import React, { Component, PropTypes } from 'react';
import { Creatable } from 'react-select';
import classNames from 'classnames';


export default class TagsInput extends Component {
  
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    selectProps: PropTypes.object
  };

  static defaultProps = {
    options: [],
    value: [],
    selectProps: {},
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  componentDidUpdate(prevProps) {
    // Got kicked out
    if (!prevProps.isLocked && this.props.isLocked) {
      this.refs.input.blur();
    }
  }

  onChange = (tags) => {
    const newVal = tags.map(tag => tag.value);
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
    let { selectProps, isLocked, editor, options, value } = this.props;
    let classnames = classNames({
      'field-text field--tags-input': true,
      'field__not-empty': Array.isArray(value) ? !!value.length : value,
      'field__focused': this.state.focused
    });
    return (
      <div className={classnames}>
        <label className="field__label">
          {this.props.label }
        </label>
        <Creatable
          multi={true}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          options={[].concat(value, options).map(tagTitle => ({'value': tagTitle, 'label': tagTitle}))}
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