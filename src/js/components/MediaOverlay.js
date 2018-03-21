import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import MediaPreviewItem from './MediaPreviewItem';
import BaseModal from 'react-overlays/lib/Modal';
import { SlideIn } from './ModalTransition';

import Selectbox from './form/Selectbox';
import SlideDown from './SlideDown';
import Switch from './form/Switch';
import FileUploadDrop from './FileUploadDrop';
import { connect } from 'react-redux';
import moment from 'moment';
import socket from '../client/socketClient';
import classNames from 'classnames';
import { isEqual } from 'lodash';

import {
  GETTY,
  AP,
  REUTERS,
  CNBC,
  LAST_USED_FORMAT
} from '../constants/media';
import S from 'string';
import $ from 'jquery';
const EDITABLE_TYPES = ['image', 'video'];
import { AnchorElement, AnchorLink, ScrollPanel } from 'react-spy-scroll';

const NO_RESULTS_MSG = "Sorry, no items is found. Try another search something else or change filters."
const TYPE_FILTER_NONE = {
  id: -1,
  title: 'All',
  subtitle: '',
  disabled: false
};
const TYPE_FILTER_ITEMS = [
  {
    id: 1,
    title: 'Image',
    subtitle: '',
    disabled: false
  },
  {
    id: 2,
    title: 'Video',
    subtitle: '',
    disabled: false
  },
  {
    id: 3,
    title: 'Chart',
    subtitle: '',
    disabled: false
  },
  {
    id: 4,
    title: 'Audio',
    subtitle: '',
    disabled: false
  }
];

const SOURCES = [
  CNBC,
  GETTY,
  AP,
  REUTERS,
];
const SOURCE_FILTER_ITEMS = SOURCES.map(source => ({
  value: source,
  label: source
}));

const LICENSE_FILTER_NONE = {
  id: -1,
  title: 'All',
  subtitle: '',
  disabled: false
};
const LICENSE_FILTER_ITEMS = [
  {
    id: 0,
    title: 'Free to use',
    subtitle: '',
    disabled: false
  },
  {
    id: 1,
    title: 'Onetime',
    subtitle: '',
    disabled: false
  },
  {
    id: 2,
    title: 'Premium',
    subtitle: '',
    disabled: false
  }
];

const LICENSE_STATUS_FILTER_ITEMS = [
  {
    id: 2,
    title: 'Licensed only'
  },
  {
    id: 3,
    title: 'Unlicensed only'
  }
];

const LAST_USED_FILTER_NONE = {
  id: -1,
  title: 'All',
  subtitle: '',
  disabled: false
};

const LAST_USED_1_WEEK = 'Not used in the last day';
const LAST_USED_2_WEEK = 'Not used in the last 3 days';
const LAST_USED_1_MONTH = 'Not used in the last week';
const LAST_USED_3_MONTH = 'Not used in the last month';
const LAST_USED_FILTER_ITEMS = [

  {
    id: 5,
    title: "Never used",
    subtitle: '',
    disabled: false,
    hours: 10000
  },
  {
    id: 4,
    title: LAST_USED_3_MONTH,
    subtitle: '',
    disabled: false,
    hours: 300
  },
  {
    id: 3,
    title: LAST_USED_1_MONTH,
    subtitle: '',
    disabled: false,
    hours: 150
  },
  {
    id: 2,
    title: LAST_USED_2_WEEK,
    subtitle: '',
    disabled: false,
    hours: 72
  },  
  {
    id: 1,
    title: LAST_USED_1_WEEK,
    subtitle: '',
    disabled: false,
    hours: 24
  },
];


const INITIAL_FILTERS = {
  type: null,
  source: [],
  license: null,
  licenseStatus: null,
  lastUsed: LAST_USED_FILTER_ITEMS[4],
  search: '',
  showAll: false
};

const SOURCE_CMS_MEDIA = 'CMS media';
const LICENSED_GROUPS = [
  GETTY,
  AP,
  REUTERS
];
const OFFSET_SCROLL = 280;
const ITEMS_PER_PAGE = 9;

class MediaOverlay extends Component {

  static propTypes = {
    showEditModal: PropTypes.bool,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    mediaList: PropTypes.array,
    multi: PropTypes.bool
  };

  static defaultProps = {
    multi: false,
    show: false,
    mediaList: [],
    onClose: () => {},
    onSubmit: () => {},
    title: "Media Library",
    cancelCaption: "Cancel",
    saveCaption: "Add files",
    imageOnly: false,
    allowEdit: true
  };

  constructor(props) {
    super(props);
    
    const initialFilters = (props.imageOnly) ? 
        Object.assign({}, { ...INITIAL_FILTERS }, {type: TYPE_FILTER_ITEMS[0]})
      :
       { ...INITIAL_FILTERS };

    this.state = {
      offsetScroll: OFFSET_SCROLL,
      selected: [],
      filters: { ...initialFilters },
      appliedFilters: { ...initialFilters },
      pagination: {
        [SOURCE_CMS_MEDIA]: 1,
        [GETTY]: 1,
        [AP]: 1,
        [REUTERS]: 1
      },
      uploadOpen: false,
      showEditModal: false,
      isShowAllToggledOnFirstSearch: false
    };
  }

  // Uploader stuff
  toggleUpload = () => {
    this.setState({
      uploadOpen: !this.state.uploadOpen
    });
    setTimeout(this.resize, 600);
  }

  beginMediaUpload = (file) => {
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize, true);
    this.resize();
    //$("body").on("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    //$("body").off("keydown", this.onKeyPress);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.show !== this.props.show) {
      if (nextProps.show) {
        $("body").on("keydown", this.onKeyPress);
      }
      else {
        $("body").off("keydown", this.onKeyPress);
      }
    }
  }

  resize = () => {
    if (window.matchMedia("(min-width: 1100px)").matches) {
      this.setState({
        offsetScroll: $('#media-overlay__fixed-nav').height()
      });
    } else {
      this.setState({
        offsetScroll: 0
      });
    }
  };

  toggle = (id) => {
    const findIndex = this.state.selected.indexOf(id);
    if (findIndex !== -1) {
      const newSelected = this.state.selected.slice();
      newSelected.splice(findIndex, 1);
      this.setState({
        selected: newSelected
      });
    } else if (this.props.multi) {
      this.setState({
        selected: [].concat(this.state.selected, id)
      });
    } else {
      this.setState({
        selected: [id]
      });
    }
  };

  isSelected = (id) => {
    return this.state.selected.indexOf(id) !== -1;
  };

  udpateSelectedMediaLastUsedDate = (selectedMedia) => {
    const userId = this.props.client.user.id;
    const fieldId = this.props.mediaFieldId;
    const nextMediaList = this.props.mediaList;
    selectedMedia.map(mediaId => {
      const mediaIndex = this.props.mediaList.findIndex(media => media.id === mediaId);
      nextMediaList[mediaIndex].lastused = moment().format(LAST_USED_FORMAT);
    });
    socket.emit("FIELD_CHANGE", userId, fieldId, nextMediaList);
  };

  onSubmit = () => {
    this.udpateSelectedMediaLastUsedDate(this.state.selected);
    const addMediaItems = this.state.selected.map(mediaId =>
      this.props.mediaList.find(media => media.id === mediaId)
    ).filter(notNullCheck => !!notNullCheck);
    this.props.onSubmit(addMediaItems);
    this.clearSelection();
  };

  clearFilters = () => {
    this.setState({
      filters: { ...INITIAL_FILTERS },
      appliedFilters: { ...INITIAL_FILTERS }
    });
  };

  clearSelection = () => {
    this.setState({selected: []})
  };

  onClose = () => {
    this.props.onClose();
    this.clearSelection();
  };

  setFilter = (filter, value) => {
    const nextFilters = this.state.filters;
    nextFilters[filter] = value;
    this.setState({
      filters: nextFilters
    })
  };

  filterContent = (mediaList = []) => {
    let filtered = mediaList;
    const filters = this.state.appliedFilters;
    if (filters.type) {
      filtered = filtered.filter(media => String(media.type).toLowerCase() === String(filters.type.title).toLowerCase());
    }
    if (filters.license) {
      filtered = filtered.filter(media => {
        const propName = String(filters.license.title).toLowerCase();
        switch (filters.license.title) {
          case "Free to use":
            return !media.onetime && !media.premium;
          case "Onetime":
            return media.onetime;
          case "Premium":
            return media.premium;
        }
        //return media[propName];
      });
    }

    if (filters.licenseStatus) {
      switch (filters.licenseStatus.id) {
        case 1: {
          break;
        }
        case 2: {
          filtered = filtered.filter(media => LICENSED_GROUPS.indexOf(media.source) === -1 || media.licensed);
          break
        }
        case 3: {
          filtered = filtered.filter(media => !(LICENSED_GROUPS.indexOf(media.source) === -1 || media.licensed));
          break;
        }
      }
    }

    if (filters.lastUsed) {
      // lastUsed values format = '> 1 week'
      const parts = filters.lastUsed.title.split(' ');
      const lastUsedTimestamp = moment().subtract(parts[1], parts[2]).unix();
      filtered = filtered.filter(media => {
        const mediaTimestamp = moment(media.lastused, LAST_USED_FORMAT).unix();
        return mediaTimestamp <= lastUsedTimestamp;
      });
    }
    if (filters.search !== '') {
      const search = String(filters.search).toLowerCase();
      filtered = filtered.filter(media =>
        String(media.slug).toLowerCase().indexOf(search) !== -1 ||
        String(media.title).toLowerCase().indexOf(search) !== -1 ||
        String(media.caption).toLowerCase().indexOf(search) !== -1 ||
        String(media.description).toLowerCase().indexOf(search) !== -1
      );
    }

    return filtered;
  };


  onSearchChange = (e) => {
    let newVal = e.target.value;
    const nextFilters = this.state.filters;
    nextFilters['search'] = newVal;
    if (!this.state.isShowAllToggledOnFirstSearch) {
      nextFilters['showAll'] = true;
    }
    this.setState({
      filters: nextFilters,
      isShowAllToggledOnFirstSearch: true
    });
  };

  _handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    this.applyFilters();
  }
}

  loadMore = (section) => {
    const pagination = this.state.pagination;
    pagination[section]++;
    this.setState({
      pagination
    });
  };

  applyFilters = () => {
    this.setState({
      appliedFilters: {...this.state.filters}
    });
  };

  isApplyEnabled = () => {
    return !isEqual(this.state.filters, this.state.appliedFilters);
  };

  isResetEnabled = () => {
    return !isEqual(this.state.filters, INITIAL_FILTERS);
  };

  renderSection = ({title, items, page}) => {


    console.log("OK so media overlay, these are the props", this.props);

    if (items.length === 0) {
      return null;
    }
    const limit = page * ITEMS_PER_PAGE;
    const loadMore = limit < items.length
    const filters = this.state.appliedFilters;
    const showDetail = filters.type && filters.type.id === 2;

    return (
      <AnchorElement
        key={`${S(title).slugify().s}`}
        id={`media-section--${S(title).slugify().s}`}
        offset={this.state.offsetScroll}
        isInside={(scrollOffset, elemTopBound, elemBottomBound) => {
          const adjustedScrollOffset = scrollOffset + this.state.offsetScroll;
          return (adjustedScrollOffset >= elemTopBound && adjustedScrollOffset <= elemBottomBound);
        }
      }
      >
        <div className={`media-section media-section--${S(title).slugify().s}`}>
        <header className="media-section__header">
          <h4 className="media-section__title">{title}</h4>
        </header>
        <div className="media-section__content">
          {items.slice(0, limit).map(props => {
              return (
              <MediaPreviewItem
                key={props.id}
                onClick={this.toggle.bind(null, props.id)}
                className={this.isSelected(props.id) ? 'selected' : ''}
                caption={props.title}
                {...props}
                editable={props.editable && this.props.allowEdit}
                showDetail={showDetail}
              />
              )
            }
          )}
          {loadMore && <footer className="media-section__footer">
            <button className="button button_style_outline-white" onClick={this.loadMore.bind(this, title)}>Load more</button>
          </footer>}
        </div>
      </div>
    </AnchorElement>
    );
  };

  onKeyPress = (e) => {
    let scrollAmt = 500;
    // up
    if (e.keyCode === 38) {
      e.preventDefault();
      e.stopPropagation();
      let currScroll = $(".media-overlay__library").scrollTop();
      let newScroll = Math.max(0, currScroll - scrollAmt);
      $(".media-overlay__library").stop().animate({
        scrollTop: newScroll
      });
    }
    else if (e.keyCode === 40) {
      e.preventDefault();
      e.stopPropagation();
      let currScroll = $(".media-overlay__library").scrollTop();
      let newScroll = currScroll + scrollAmt;
      $(".media-overlay__library").stop().animate({
        scrollTop: newScroll
      });
    }
  }

  render() {
    const { client } = this.props;
    const { uploadOpen, offsetScroll } = this.state;
    const mediaList = this.filterContent(this.props.mediaList);
    const show = this.props.show;
    const classnames = classNames({
      'media-overlay': true,
      'media-overlay--show': true,
      'media-overlay--is-editing': this.state.showEditModal
    });
    
    const sectionItems = [
      {
        title: SOURCE_CMS_MEDIA,
        items: mediaList.filter(media => LICENSED_GROUPS.indexOf(media.source) === -1),
        page: this.state.pagination[SOURCE_CMS_MEDIA]
      },
      ...LICENSED_GROUPS.map(source => ({
          title: source,
          items: mediaList.filter(media => source === media.source),
          page: this.state.pagination[source]
        })
      )
    ];

    const controls = (
      <div>
        <Modal.Title>
          { this.props.title }
          <button className="media-upload-button" onClick={this.toggleUpload}>
            <i className="fa fa-upload"></i>Upload
          </button>
        </Modal.Title>

      <div className="modal-search">
        <input
          value={this.state.filters.search}
          placeholder="Search"
          onChange={this.onSearchChange}
          onKeyPress={this._handleKeyPress}
        />
      </div>
      <div className="filters">
        {
          this.props.imageOnly === false ?
            <Selectbox
              onChange={this.setFilter.bind(this, 'type')}
              value={this.state.filters.type}
              helpText=""
              label="Type"
              items={TYPE_FILTER_ITEMS}
              search={false}
              allowCustomText={false}
              inputPlaceholder=""
              noneText="Any"
            />
            :
            null
        }
        <Selectbox
          onChange={this.setFilter.bind(this, 'license')}
          value={this.state.filters.license}
          helpText=""
          label="License condition"
          search={false}
          allowCustomText={false}
          inputPlaceholder=""
          items={LICENSE_FILTER_ITEMS}
          noneText="Any"
        />
        <Selectbox
          onChange={this.setFilter.bind(this, 'licenseStatus')}
          value={this.state.filters.licenseStatus}
          helpText=""
          label="License status"
          search={false}
          allowCustomText={false}
          inputPlaceholder=""
          items={LICENSE_STATUS_FILTER_ITEMS}
          noneText="Any"
        />
        {      
          client.user.role === "USER_ROLE_PHOTODESK" ?
            <Selectbox
              onChange={this.setFilter.bind(this, 'lastUsed')}
              value={this.state.filters.lastUsed}
              helpText=""
              label="Last usage"
              search={false}
              allowCustomText={false}
              inputPlaceholder=""
              items={LAST_USED_FILTER_ITEMS}
              noneText="Any"
            />
          :
            null
        }
        <button
          className={`button button_style_fill-accent ${this.isApplyEnabled() ? '' : 'disabled'}`}
          onClick={this.applyFilters}
        >Apply</button>
        <button
          className={`button button_style_outline-white ${this.isResetEnabled() ? '' : 'disabled'}`}
          onClick={this.clearFilters}
        >
          <span className="buttonText">Reset</span>
        </button>
      </div>
      <SlideDown isOpen={uploadOpen} duration={500}>
        <FileUploadDrop beginMediaUpload={this.beginMediaUpload} onCloseClick={this.toggleUpload} />
      </SlideDown>
    </div>);

    const modalClassName = classNames({
      'media-overlay': true,
      'media-overlay--upload-open': uploadOpen
    });
    return (
      <div className={classnames}>
        <BaseModal
          backdrop="static"
          enforceFocus={false}
          show={show}
          onHide={this.props.onClose}
          bsClass="media-overlay"
          className={modalClassName}
          dialogClassName="cnbc-modal"
          transition={SlideIn}
        >
          <div className="modal-main">
            <div className="modal-header">
              <button type="button" onClick={this.props.onClose} className="modal-close" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>

              <div id="media-overlay__fixed-nav" className="media-overlay__nav">
                { controls }
              </div>
            </div>

            <ScrollPanel tag="div" offset={this.state.offsetScroll} className="media-overlay__library">
              <div className="media-overlay__nav-mobile">
                { controls }
              </div>
              <Modal.Body>

                { mediaList.length ?
                  sectionItems.map(section => this.renderSection(section)) :
                  <div className="media-overlay__no-results">{NO_RESULTS_MSG}</div>
                }
              </Modal.Body>
            </ScrollPanel>
            <ul className="c-Nav js-scrollSpyNav" data-top-offset="50">
              {sectionItems.map((section,index) => <li key={index}>
                <AnchorLink
                  href={`media-section--${S(section.title).slugify().s}`}
                  className={`section-nav_wrapper c-Nav-item js-scrollNavItem section-nav_link--${S(section.title).slugify().s} ${section.items.length === 0 ? 'disabled' : ''}`}
                  activeClass="is-active"
                >
                  <span className="c-Nav-item-title">{section.title}</span>
                </AnchorLink>
              </li>)
              }
            </ul>
            <div className="modal-bottom-cta">
              {
                this.props.mode !== "SAVE" ?
                 <button className="button button_style_fill-accent" onClick={this.onSubmit}>{ this.props.saveCaption }</button>
                :
                  null
              }
              <button className="button button_style_outline-white" onClick={this.props.onClose}>{ this.props.cancelCaption }</button>
            </div>
          </div>
        </BaseModal>
      </div>
    );
  }
}

export default connect(state => ({
  client: state.client,
  mediaFieldId: state.fields[15].id,
  mediaList: state.fields[15].value
}))(MediaOverlay);
