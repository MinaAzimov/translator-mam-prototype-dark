import React, { Component, PropTypes } from 'react';
import { mediaLicenseClose } from './../actions/media-license';
import { connect } from 'react-redux';
import moment from 'moment';
import Prompt from './Prompt';
import { RadioGroup, Radio } from 'react-radio-group';
import {
  LAST_USED_FORMAT,
  EXPIRATION_FORMAT,
  GETTY,
  GETTY_OPTIONS,
  GETTY_PLACEHOLDERS,
  AP,
  AP_OPTIONS,
  AP_PLACEHOLDERS,
  REUTERS,
  REUTERS_ONETIME,
  REUTERS_PREMIUM,
  REUTERS_PLACEHOLDERS
} from '../constants/media';

class MediaLicensePrompt extends Component {
  static propTypes = {
    showLicenseModal: PropTypes.bool,
    mediaId: PropTypes.number,
    placeholders: PropTypes.object,
    mediaLicenseClose: PropTypes.func,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onStopEdit: PropTypes.func,
    onStartEdit: PropTypes.func,
    value: PropTypes.array,
    label: PropTypes.string,
    isLocked: PropTypes.bool,
    imEditing: PropTypes.bool,
    editor: PropTypes.string
  };

  static defaultProps = {
    onClose: () => {},
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    };
  }

  handleChange = (value) => {
    this.setState({selectedValue: value});
  };

  onCancel = () => {
    this.setState({
      selectedValue: ''
    });
    this.props.mediaLicenseClose();
  };

  onSubmit = () => {
    if (this.props.mediaId) {
      const nextValue = (this.props.value || []).slice();
      const licensedIndex = nextValue.findIndex(media => media.id === this.props.mediaId);
      if (licensedIndex !== -1) {
        switch (nextValue[licensedIndex].source) {
          case AP:
          {
            nextValue[licensedIndex].expire = Object.keys(AP_OPTIONS).find(
              shortKey => AP_OPTIONS[shortKey] === this.state.selectedValue
            );
            nextValue[licensedIndex].lastused = moment().format(LAST_USED_FORMAT);
            break;
          }
          case GETTY:
          {
            nextValue[licensedIndex].width = GETTY_OPTIONS[this.state.selectedValue].width;
            nextValue[licensedIndex].height = GETTY_OPTIONS[this.state.selectedValue].height;
            break;
          }
          case REUTERS:
            break;
        }
        nextValue[licensedIndex].licensed = true;
        this.props.onChange(nextValue);
      }
    }
    this.setState({
      selectedValue: ''
    });
    this.props.mediaLicenseClose();
  };

  render() {
    const { licensing_info = '', select_text = '', licensing_options = [] } = this.props.placeholders || {};

    const radios = licensing_options.map(option => {
      const id = 'id' + option.replace(/\s/g, '');
      return (
        <div>
          <Radio id={id} value={option} /><label htmlFor={id}>{option}</label>
        </div>
      )});

    const header = <h2 className="licensing-popup__title">Are you sure you'd like to license this image?</h2>;


    return (<Prompt
      show={this.props.showLicenseModal}
      onCancel={this.onCancel}
      onSubmit={this.onSubmit}
      header={header}
      cancelText="Nevermind"
      submitText="License"
      submitDisable={licensing_options.length > 0 && !this.state.selectedValue}
    >
      <div>
        <h3 className="licensing-popup__info">{ licensing_info }</h3>
        <div className="modal__select-license">
          <h4 className="modal__select-text">{ select_text }</h4>
          <RadioGroup
            className="iradio"
            name="license_options"
            selectedValue={ this.state.selectedValue }
            onChange={ this.handleChange }>
            { radios }
          </RadioGroup>
        </div>
      </div>
    </Prompt>);
  }
}

export default connect((state)=>({
    showLicenseModal: state.mediaLicense.showLicenseModal,
    mediaId: state.mediaLicense.licenseMediaId,
    placeholders: state.mediaLicense.placeholders
  }),
  {
    mediaLicenseClose
  }
)(MediaLicensePrompt);
