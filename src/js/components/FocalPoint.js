import React, { Component, PropTypes } from 'react';
import { IMAGE_STYLES } from '../constants/image-styles';
const FocalPointPropType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number
});
import Draggable from 'react-draggable';
import $ from 'jquery';
import Text from './form/Text';
import { cropper } from 'cropper';

window.$ = $;
require('cropper');

function lockSelection() {
  window.document.body.classList.add('disable-user-select');
}

function unlockSelection() {
  window.document.body.classList.remove('disable-user-select');
}

class FocalPoint extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    initialValue: FocalPointPropType
  };

  static defaultProps = {
    onChange: () => {},
    initialValue: {
      x: 50,
      y: 50
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      inDrag: false,
      x: props.initialValue.x,
      y: props.initialValue.y
    };
  }

  onClick = (e) => {
    const focalPoint = this.handleMoveEvent(e.nativeEvent);
    this.setState({
      inDrag: false,
      ...focalPoint,
    });
    this.props.onChange(focalPoint);
  };

  handleMoveEvent = (event) => {
    const bounds = this.refs.draggable.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    return this.getCursorPersentagePosition(offsetX, offsetY);
  };

  getCursorPersentagePosition = (x, y) => {
    const width  = this.refs.draggable.clientWidth;
    const height  = this.refs.draggable.clientHeight;
    const x_percentage = Math.ceil((x / width) * 100);
    const y_percentage = Math.ceil((y / height) * 100);

    return {
      x: x_percentage < 0 ? 0 : (x_percentage > 100 ? 100 : x_percentage),
      y: y_percentage < 0 ? 0 : (y_percentage > 100 ? 100 : y_percentage)
    };
  };

  onMouseDown = (e) => {
    const focalPoint = this.handleMoveEvent(e.nativeEvent);
    lockSelection();
    this.setState({
      inDrag: true,
      ...focalPoint,
    });
  };

  onMouseUp = () => {
    unlockSelection();
    this.setState({
      inDrag: false
    });
  };

  onMouseMove = (e) => {
    if (this.state.inDrag) {
      const focalPoint = this.handleMoveEvent(e.nativeEvent);
      this.setState({
        ...focalPoint
      });
      this.props.onChange(focalPoint);
    }
  };

  onMouseLeave = () => {
    if (this.state.inDrag) {
      this.setState({
        inDrag: false
      });
    }
  };

  render() {
    return (
      <div
        ref="draggable"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        className="focal-point__cursor-draggable-area"
      >
        <i className="focal-point__cursor" style={{top: `${this.state.y}%`, left: `${this.state.x}%`}} />
      </div>
    );
  }
}

class FocalRectangle extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    start: FocalPointPropType,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    onChange: () => {},
    start: {
      x: 0,
      y: 0
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      draggableEnabled: false,
      dimensions: null,
      start: null
    };
  }

  componentDidMount() {
    const fitDimensions = this.calculateDimensions(this.props);
    this.setState({
      dimensions: fitDimensions,
      start: this.calculatePosition(this.props.start, fitDimensions)
    });
  }

  componentWillReceiveProps(nextProps) {
    const fitDimensions = this.calculateDimensions(nextProps);
    this.setState({
      dimensions: fitDimensions,
      start: this.calculatePosition(nextProps.start, fitDimensions)
    });
  }

  calculateDimensions = (props) => {
    const parentWidth  = this.refs.draggable.clientWidth;
    const parentHeight  = this.refs.draggable.clientHeight;
    const { width, height } = props.dimensions;
    const widthProportion = width / parentWidth;
    const heightProportion = height / parentHeight;
    let dimensions;
    // resize first
    if (widthProportion >= heightProportion) {
      const newWidth = parentWidth;
      const newHieght = height * ( parentWidth / width);
      dimensions = {
        width: newWidth,
        height: newHieght
      };
    } else {
      const newHieght = parentHeight;
      const newWidth = width * ( parentHeight / height);
      dimensions = {
        width: newWidth,
        height: newHieght
      };
    }
    return dimensions;
  };

  calculatePosition = (focalPoint, dimensions) => {
    const parentWidth  = this.refs.draggable.clientWidth;
    const parentHeight  = this.refs.draggable.clientHeight;
    const coords = {
      x: Math.ceil(focalPoint.x / 100 * (parentWidth - dimensions.width)),
      y: Math.ceil(focalPoint.y / 100 * (parentHeight - dimensions.height))
    };
    return coords;
  };

  onStop = (event, ui) => {
    const x_percentage = Math.ceil(ui.x / (this.refs.draggable.clientWidth - this.state.dimensions.width + 1)  * 100);
    const y_percentage = Math.ceil(ui.y / (this.refs.draggable.clientHeight - this.state.dimensions.height + 1) * 100);
    this.props.onChange({
      x: x_percentage < 0 ? 0 : (x_percentage > 100 ? 100 : x_percentage),
      y: y_percentage < 0 ? 0 : (y_percentage > 100 ? 100 : y_percentage)
    });
  };

  render() {
    return (
      <div
        ref="draggable"
        className="focal-point__cursor-draggable-area"
      >
        {this.state.start && <Draggable
          bounds="parent"
          onStop={this.onStop}
          position={this.state.start}
        >
          <i className="focal-point__rectangle" style={{
            width: this.state.dimensions.width,
            height: this.state.dimensions.height
            }}
          />
        </Draggable>}
      </div>
    );
  }
}

class CropsPreview extends Component {

  PREVIEW_WIDTH = 100;

  static propTypes = {
    media: PropTypes.object.isRequired,
    onStyleSelect: PropTypes.func,
    selectedId: PropTypes.number
  };

  static defaultProps = {
    onStyleSelect: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      selectedId: props.selectedId || null,
      paginationText: "",
      search: ""
    };
  }

  componentDidMount() {
    this.setState({
      paginationText: this.getPurposePagination()
    });
  }

  selectStyle = (styleId) => {
    this.setState({
      selectedId: styleId
    });
    this.props.onStyleSelect(IMAGE_STYLES.find(imageStyle => imageStyle.id === styleId));
  };

  prevClick = () => {
    $('#purposeWrapper').animate( { scrollLeft: '-=480' }, 600, () => {
      this.setState({
        paginationText: this.getPurposePagination()
      });
    });
  };

  nextClick = () => {
    $('#purposeWrapper').animate( { scrollLeft: '+=480' }, 600, () => {
      this.setState({
        paginationText: this.getPurposePagination()
      });
    });
  };

  getPurposePagination = () => {
    var scrollOffset = $('#purposeWrapper').scrollLeft();
    var width = this.refs.purposeWrapper.getBoundingClientRect().width;
    var firstIndex = Math.floor(scrollOffset/this.PREVIEW_WIDTH) + 1;
    var lastIndex = firstIndex + Math.round(width/this.PREVIEW_WIDTH) - 1;
    var count = IMAGE_STYLES.filter(this.filterItems).length;

    lastIndex = lastIndex < count ? lastIndex : count;
    return firstIndex + ' — ' + lastIndex + ' of ' + count;
  };

  onPreviewBarScroll = () => {
    if (this.state.paginationText) {
      this.setState({
        paginationText: this.getPurposePagination()
      });
    }
  };

  onFilterChange = (text) => {
    this.setState({search: text});
    setTimeout(() => {
      this.setState({
        paginationText: this.getPurposePagination()
      });
    }, 600)
  };

  filterItems = imageStyle => {
    if (this.state.search) {
      const search = String(this.state.search).toLowerCase();
      return String(imageStyle.title).toLowerCase().indexOf(search) !== -1
    }
    return true;
  };

  render() {
    const { media: { filename, focalPoint = { x: 50, y: 50 }, focalRectanglePositions = {} } } = this.props;
    const renderedImageStyles = IMAGE_STYLES.filter(this.filterItems).map(imageStyle =>
    <div className={`purpose ${this.state.selectedId === imageStyle.id ? 'is-active' : ''}`}>
      <div
        key={imageStyle.title}
        className={`purpose-img ${imageStyle.className}`}
        onClick={this.selectStyle.bind(this, imageStyle.id)}
        style={{
          backgroundImage: `url("${filename}")`,
          backgroundPosition: focalRectanglePositions[imageStyle.id] ? `${focalRectanglePositions[imageStyle.id].x}% ${focalRectanglePositions[imageStyle.id].y}%` : `${focalPoint.x}% ${focalPoint.y}%`
        }}
      ></div>
      <div className="purpose-title">{imageStyle.title}</div>
    </div>);


    return (
      <div className="purposes">
        <div className="purpose__header ">
          <div>
            <div data-reactroot="" className="input__wrapper">
              <Text
                onChange={this.onFilterChange}
                value=""
                helpText=""
                label="Search preview"
              />
            </div>
          </div>
          <div className="right">
            <div className="purpose-paginator" id="p-paginator">{this.state.paginationText}</div>
          </div>
        </div>
        <i className="purposes__left fa fa-chevron-left" id="scrollLeft" onClick={this.prevClick}></i>
        <div ref="purposeWrapper" className="purposes__wrapper" id="purposeWrapper" onScroll={this.onPreviewBarScroll}>
          <div className="purposes__container" style={{width: this.PREVIEW_WIDTH * renderedImageStyles.length + 'px'}}>
            { renderedImageStyles }
          </div>
        </div>
        <i className="purposes__right fa fa-chevron-right" id="scrollRight" onClick={this.nextClick}></i>
      </div>
    );
  }
}


class Cropper extends Component {

  static defaultProps = {
    options: {
      scalable: false,
      zoomable: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      cropData: {
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount() {

    const $el = $(this.el);

    $el.cropper(this.props.options);

    $el.on('crop', (e) => {
      let cropData = $el.cropper("getData");
      this.setState({
        cropData: cropData
      })
      if (e.action === 'crop') {
        e.preventDefault();
      }
    });

    $el.on('ready', (e) => {
      this.imgData = $el.cropper("getImageData");
    });
  }

  componentWillUnmount() {
    $(this.el).cropper('destroy');
  }

  render() {

    const { x, y, width, height } = this.state.cropData;

    let scaleFactor = 1;

    if (this.previewEl) {

      const previewWidth = this.previewEl.offsetWidth;
      const previewHeight = this.previewEl.offsetHeight;
      const previewRatio = previewWidth/previewHeight;

      const cropRatio = width/height;

      if (cropRatio > previewRatio) {
        // Need to scale X of the crop
        scaleFactor = previewWidth/width;
      }
      else {
        scaleFactor = previewHeight/height;
      }
    }


    const previewStyle = {
      width: width * scaleFactor,
      height: height * scaleFactor
    }

    const previewImgStyle = {
      left: -x * scaleFactor,
      top: -y * scaleFactor,
      width: this.imgData ? this.imgData.naturalWidth * scaleFactor : "auto",
      height: this.imgData ? this.imgData.naturalHeight * scaleFactor : "auto"
    }


    return (
      <div className="cropper-wrapper">
        <div className="cropper__img-wrapper">
          <img key={1} ref={(el)=>{this.el = el}} src={this.props.imgSrc}/>
        </div>
        <div className="cropper-results">
          <div className="cropper-results__stats">
            <div className="field_read-only">
              <div>X</div>
              <div>{Math.round(x)}</div>
            </div>
            <div className="field_read-only">
              <div>Y</div>
              <div>{Math.round(y)}</div>
            </div>
            <div className="field_read-only">
              <div>Width</div>
              <div>{Math.round(width)}</div>
            </div>
            <div className="field_read-only">
              <div>Height</div>
              <div>{Math.round(height)}</div>
            </div>
          </div>
          <div className="cropper-preview__wrapper" ref={(el)=>{this.previewEl = el}}>
            <div className="cropper-preview" style={previewStyle}>
              <img src={this.props.imgSrc} style={previewImgStyle}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {
  FocalPoint,
  FocalRectangle,
  CropsPreview,
  Cropper
};