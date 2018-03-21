import React, { Component, PropTypes } from 'react';
import Range from 'react-range';
import Selectbox from './form/Selectbox';
import socket from '../client/socketClient';
import { connect } from 'react-redux';
import Prompt from './Prompt';
import Text from './form/Text';

const DEFAULT_EFFECTS = {
  contrast: 100, // shadows
  brightness: 100, // highlights
  shadowOpacity: 1, // amount
  shadowBlur: 0 // midpoint
};

function Image(props) {
  const { media, ...imgProps } = props;
  const effects = media.effects;
  const vignetteStyles = effects ?
  {boxShadow: `0 0 ${effects.shadowBlur}px rgba(0, 0, 0, ${effects.shadowOpacity}) inset`} : {};
  const imageStyles = effects ? {filter: `contrast(${effects.contrast}%) brightness(${effects.brightness}%)`} : {};

  return (<div style={{position: 'relative'}}>
    <img {...imgProps} style={imageStyles} />
    <div className="vignette" style={vignetteStyles} />
  </div>);
}

class ImageEditControls extends Component {

  static propTypes = {
    presets: PropTypes.array,
    client: PropTypes.any,
  };

  constructor(props) {
    super(props);

    let effects = props.effects || DEFAULT_EFFECTS ;
    this.state = {
      effects: {...effects},
      selectedPreset: null,
      showPrompt: false,
      presetOverride: false
    };
  }

  savePreset(presetName, effects) {
    const userId = this.props.client.user.id;
    const nextState = { ...this.state, presetOverride: false };
    let nextPresets = this.props.presets;
    let isNewPreset = true;
    nextPresets.value = nextPresets.value.map(preset => {
      if (preset.title === presetName) {
        isNewPreset = false;
        return {
          ...preset,
          effects
        }
      }
      return preset;
    });

    if (isNewPreset) {
      const newPreset = {
        id: nextPresets.value.length,
        title: presetName,
        subtitle: '',
        disabled: false,
        effects
      };
      nextPresets.value.push(newPreset)
      nextState.selectedPreset = newPreset;
    }
    this.setState(nextState);
    socket.emit("FIELD_CHANGE", userId, nextPresets.id, nextPresets.value);
  }

  onPresetSelect = (preset) => {
    const effects = Object.assign({}, preset && preset.effects || DEFAULT_EFFECTS);
    if (preset) {
      this.setState({
        effects: effects,
        selectedPreset: preset,
        presetOverride: false
      });
    } else {
      this.setState({
        effects: effects,
        selectedPreset: null,
        presetOverride: false
      });
    }

    this.props.onChange(effects);
  };

  handleOnChange = (type, event) => {
    let value = parseInt(event.nativeEvent.target.value, 10);

    if (type === 'shadowOpacity') {
      value = value / 100;
    }
    const newEffects = { ...this.state.effects };
    newEffects[type] = value;
    this.setState({
      effects: newEffects,
      presetOverride: !!this.state.selectedPreset || false
    });
    this.props.onChange(newEffects);
  };

  onPromptOk = () => {
    this.savePreset(this.state.newPresetName, this.state.effects);
    this.togglePrompt();
  };

  togglePrompt = () => {
    this.setState({
      showPrompt: !this.state.showPrompt
    });
  };

  onNameChange = (newPresetName) => {
    this.setState({
      newPresetName
    });
  };

  resetEffects = () => {
    const nextState = {
      presetOverride: false
    };
    if (this.state.selectedPreset) {
      nextState.effects = { ...this.state.selectedPreset.effects };
    } else {
      nextState.effects = { ...DEFAULT_EFFECTS };
    }
    this.setState(nextState);
    this.props.onChange(nextState.effects);
  };

  render() {

    const {
      contrast,
      brightness,
      shadowOpacity,
      shadowBlur
    } = this.state.effects;

    const shadowOpacityInt = parseInt(shadowOpacity * 100, 10);
    return (<div className="image-effects">
      <div className="image-effects__presents-group">
        <h4 className="image-effects__group-title">Level</h4>
        <div className="image-effects__range-group level">
          <div className="image-effects__range-info">
            <label className="image-effects__range-label">
              Shadows
            </label>
            <i className="image-effects__range-value">
              {contrast}
            </i>
          </div>
          <Range
            onChange={this.handleOnChange.bind(this, 'contrast')}
            className='slider range--shadows'
            type='range'
            value={contrast}
            min={0}
            max={250}
          />
        </div>
        <div className="image-effects__range-group">
          <div className="image-effects__range-info">
            <label className="image-effects__range-label">
              Highlights
            </label>
            <i className="image-effects__range-value">
              {brightness}
            </i>
          </div>
          <Range
            onChange={this.handleOnChange.bind(this, 'brightness')}
            className='slider range--highlights'
            type='range'
            value={brightness}
            min={0}
            max={250}
          />
        </div>
      </div>
      <div className="image-effects__presents-group">
        <h4 className="image-effects__group-title">Vignette</h4>
        <div className="image-effects__range-group">
          <div className="image-effects__range-info">

            <label className="image-effects__range-label">
              Opacity
            </label>
            <i className="image-effects__range-value">
              {shadowOpacityInt}
            </i>
          </div>
          <Range
            onChange={this.handleOnChange.bind(this, 'shadowOpacity')}
            className='slider range--amount'
            type='range'
            value={shadowOpacityInt}
            min={0}
            max={100}
          />
          <div className="image-effects__range-values-info">
            <i className="image-effects__range-min-value">
            0
            </i>
            <i className="image-effects__range-max-value">
            100
            </i>
          </div>
        </div>
        <div className="image-effects__range-group">
          <div className="image-effects__range-info">
            <label className="image-effects__range-label">
              Midpoint
            </label>
            <i className="image-effects__range-value">
              {shadowBlur}
            </i>
          </div>
          <Range
            onChange={this.handleOnChange.bind(this, 'shadowBlur')}
            className='slider range--highlights'
            type='range'
            value={shadowBlur}
            min={0}
            max={250}
          />
          <div className="image-effects__range-values-info">
            <i className="image-effects__range-min-value">
              0
            </i>
            <i className="image-effects__range-max-value">
              250
            </i>
          </div>
        </div>
      </div>
      <div className="image-effects__presents-group image-effects__template">
        <div className="preset-container">
          <h4 className="image-effects__group-title">Preset</h4>
          <Selectbox
            onChange={this.onPresetSelect}
            value={this.state.selectedPreset}
            helpText=""
            label="Preset"
            items={this.props.presets.value}
          />
          <span className="image-effects__presents-or">or</span>
          <button onClick={this.togglePrompt} className="image-effects__presents-new">
            <i className="image-effects__presents-plus">+</i>
            <span className="image-effects__presents-new-text">Add current setting to the preset...</span>
          </button>
        </div>
        <div>
          { this.state.presetOverride &&
            this.state.selectedPreset &&
          <button
            className="button button_style_fill-accent"
            onClick={this.savePreset.bind(this, this.state.selectedPreset.title, this.state.effects)}
          >Override Preset</button>
          }
          <button onClick={this.resetEffects} className="button button_style_outline-white">Reset</button>
        </div>
      </div>
      <Prompt
        show={this.state.showPrompt}
        onCancel={this.togglePrompt}
        onSubmit={this.onPromptOk}
        header={<h2 className="licensing-popup__title">Enter the preset name</h2>}
        cancelText="Cancel"
        submitText="Save"
      >
        <Text
          onChange={this.onNameChange}
          value=""
          helpText=""
          label="New preset name"
        />
      </Prompt>
    </div>);
  }
}

function stateToProps(state) {
  return {
    presets: state.fields[30],
    client: state.client
  }
}

module.exports = {
  Image,
  ImageEditControls: connect(stateToProps)(ImageEditControls)
};
