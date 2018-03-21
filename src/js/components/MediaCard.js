import React, { Component, PropTypes } from 'react';
import MediaOverlay from './MediaOverlay';
import MediaPreviewItem from './MediaPreviewItem';
import Selectbox from './form/Selectbox';
import { connect } from 'react-redux';
import { MEDIA_USAGES } from '../constants/media';

const TOGGLE_STATE_EMPTY = 'selected--none';
const TOGGLE_STATE_ALL = 'selected--all';
const TOGGLE_STATE_PARTLY = 'selected--partly';

class CardMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selected: []
    };
  }

  static propTypes = {
    mediaEditOpenIds: PropTypes.func,
    mediaList: PropTypes.array,
    cardMediaUsageMaps: PropTypes.array,
    onChange: PropTypes.func,
    onStartEdit: PropTypes.func,
    onStopEdit: PropTypes.func,
    value: PropTypes.any,
    label: PropTypes.string,
    isLocked: PropTypes.bool,
    imEditing: PropTypes.bool,
    editor: PropTypes.string
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  toggle = (id) => {
    const findIndex = this.state.selected.indexOf(id);
    if (findIndex !== -1) {
      const newSelected = this.state.selected.slice();
      newSelected.splice(findIndex, 1);
      this.setState({
        selected: newSelected
      });
    } else {
      this.setState({
        selected: [].concat(this.state.selected, id)
      });
    }
  };

  getToggleState = () => {
    if (this.state.selected.length === 0) {
      return TOGGLE_STATE_EMPTY;
    } else {
      if (this.state.selected.length === this.props.cardMediaUsageMaps.length) {
        return TOGGLE_STATE_ALL;
      } else {
        return TOGGLE_STATE_PARTLY;
      }
    }
  };

  toggleAll = () => {
    const allSelectedState = this.getToggleState();
    if (allSelectedState === TOGGLE_STATE_ALL) {
      this.setState({selected: []});
    } else {
      this.setState({selected: this.props.cardMediaUsageMaps.map((usageMap, mapIndex) => mapIndex)});
    }
  };

  isSelected = (id) => {
    return this.state.selected.indexOf(id) !== -1;
  };

  removeSelected = () => {
    const nextCardMediaUsageMaps = this.props.cardMediaUsageMaps.filter(
      (usageMap, mapIndex) => this.state.selected.indexOf(mapIndex) === -1
    );
    this.props.onChange(nextCardMediaUsageMaps);
    this.setState({selected: []});
    this.props.onStopEdit();
  };

  onUsageChange = (mapIndex, usage) => {
    const nextCardMediaUsageMaps = this.props.cardMediaUsageMaps.map((mapUsage, index) => {
      if (mapIndex === index) {
        mapUsage.usage = usage;
      }
      return mapUsage;
    });
    this.props.onChange(nextCardMediaUsageMaps);
  };

  getAvailableUsages = () => {
    const availableUsages = MEDIA_USAGES.map((title, id) => ({
      id,
      title,
      subtitle: '',
      disabled: false
    }));
    this.props.cardMediaUsageMaps.map(mapUsage => {
      const usageIndex = availableUsages.findIndex(usage => mapUsage.usage && usage.title === mapUsage.usage.title);
      if (usageIndex !== -1) {
        availableUsages[usageIndex].disabled = true;
      }
    });
    return availableUsages;
  };

  overlaySubmit = (selectedMedia) => {
    const newMediaUsageMaps = selectedMedia.map(media => ({
      mediaId: media.id,
      usage: ''
    }));
    const cardMediaUsageMaps = [].concat(this.props.cardMediaUsageMaps, newMediaUsageMaps);
    this.props.onChange(cardMediaUsageMaps);
    this.close();
  };

  render() {
    let { title, mediaList = [], cardMediaUsageMaps = [] } = this.props;
    const availableUsages = this.getAvailableUsages();

    return (
      <div>
        <div className="uk-sticky-placeholder">
          <div className="card__controls" >
            <div className="left">
              <div className={`selectAll ${this.getToggleState()}`}>
                <button
                  className={`empty ${ cardMediaUsageMaps.length ? '' : 'disabled' }`}
                  id="selectAll"
                  title="Select All"
                  onClick={this.toggleAll}
                ></button>
                <label
                  id="selectAllLabel"
                  htmlFor="selectAll"
                  className={cardMediaUsageMaps.length ? '' : 'disabled'}
                >{this.getToggleState() === TOGGLE_STATE_ALL ? 'Deselect All' : 'Select All'}</label>
              </div>
              <button
                className={`button button_style_transparent-gray ${ cardMediaUsageMaps.length > 1 ? '' : 'disabled' }`}
                id="multiEdit"
              >
                <i className="fa fa-pencil-square"></i>
                <span className="buttonText">  Multi Edit</span>
                <div className="button__warning is-hidden"></div>
              </button>
              <button
                className={`button button_style_transparent-gray ${ cardMediaUsageMaps.length ? '' : 'disabled' }`}
                id="bulkRemove"
                disabled=""
                onClick={this.removeSelected}
              >
                <i className="fa fa-times-circle"></i><span className="buttonText">  Remove</span>
              </button>
            </div>
            <div className="right">
              <button className="button button_style_transparent-gray media-card__add" id="assetLibrary" onClick={ this.open }>
                <i className="fa fa-folder-open"></i>
                <span className="buttonText">  Add media...</span>
              </button>
            </div>
          </div>
        </div>
        <div className="media-card-grid">
          {
            cardMediaUsageMaps.map((mediaUsageMap, mapIndex) => {
              const props = mediaList.find(media => mediaUsageMap.mediaId === media.id);
              return (
                <div className="media-card-item">
                  <MediaPreviewItem
                    onClick={this.toggle.bind(null, mapIndex)}
                    className={this.isSelected(mapIndex) ? 'selected' : ''}
                    caption={props.title}
                    {...props}
                  >
                    <Selectbox
                      onChange={this.onUsageChange.bind(this, mapIndex)}
                      value={mediaUsageMap.usage || ''}
                      helpText=""
                      label="usage"
                      items={availableUsages}
                      search={false}
                      allowCustomText={false}
                      inputPlaceholder=""
                    />
                  </MediaPreviewItem>
                </div>
              );
            })
          }
        </div>
        <MediaOverlay
          show={this.state.showModal}
          onClose={this.close}
          onSubmit={this.overlaySubmit}
          multi={true}
        >
        </MediaOverlay>
      </div>
    );
  }
}

export default connect(state => ({
  mediaList: state.fields[15].value,
  cardMediaUsageMaps: state.fields[16].value
}))(CardMedia);
