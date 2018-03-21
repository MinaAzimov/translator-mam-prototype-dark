import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuid from 'uuid';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import $ from "jquery";
/*

  The repeater widget takes a component as a child and uses that
  as a template to repeat the component. this.props.items should
  be an array of objects, and each object gets passed into copies
  of the template component as props.data.

  As long as the template component implements an onChange, it will
  notify the repeater and update accordingly.

*/


class Repeater extends Component {

  constructor(props) {
    super(props);
  }

  
  addItem = () => {
    let newItems = this.props.items.slice();
    newItems.push({
      _repeaterItemId: uuid.v1(),
      value: null
    });
    if (this.props.onChange) {
      this.props.onChange(newItems);
    }
  }

  removeItem = (id) => {
    var items = this.props.items.slice();
    let index = items.findIndex(i => i._repeaterItemId === id);
    items.splice(index, 1);
    if (this.props.onChange) {
      this.props.onChange(items);
    }
  }

  onItemChange = (id, value) => {
    let items = this.props.items.slice();
    let index = items.findIndex(i => i._repeaterItemId === id);
    items[index].value = value;
    if (this.props.onChange) {
      this.props.onChange(items);
    }
  }

  moveItem = (dragIndex, hoverIndex) => {
    const items = this.props.items.slice();
    const dragItem = items[dragIndex];

    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);

    if (this.props.onChange) {
      this.props.onChange(items);
    }
  } 

  reorder (droppedIndex) {
    var items = this.state.items;
    var draggedItem = items[this.currentDraggedIndex];
    // remove from aoriginal place
    items.splice(this.currentDraggedIndex, 1);
    items.splice(droppedIndex, 0, draggedItem);
    this.setState({
      items: items
    });
  }

  render() {
    // We use the child as a template to build other items in the list
    const child = this.props.children;
    const items = this.props.items;
    const allowAdd = this.props.allowAdd;

    return (
      <div className="repeater-wrapper" ref="container">
        <div className="repeater-list">
          <ReactCSSTransitionGroup transitionName="repeater-item" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {
              items.map((item, index) => {
                return (
                  <RepeaterItem
                    template={child}
                    index={index}
                    id={item._repeaterItemId}
                    value={item.value}
                    key={item._repeaterItemId}
                    onRemove={this.removeItem}
                    onChange={this.onItemChange}
                    onMove={this.moveItem}
                    showRemove={items.length > 1}
                  />
                );
              })
            }
          </ReactCSSTransitionGroup>
        </div>

        {
          allowAdd ?
            <div className="repeater__add-wrapper">
              <div className="repeater__add" onClick={this.addItem}>
                <i className="fa fa-plus"></i>Add item
              </div>
            </div>
          :
            null
        }
      </div>
    );
  }
}

Repeater.defaultProps = {
  allowAdd: true
}






/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var itemSource = {
  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { index: props.index };
    return item;
  }
};

/**
 * Specifies the drop target contract.
 * Only `beginDrag` function is required.
 */
var itemTarget = {

  hover: function (props, monitor, component) {

    // props are the dragged components props

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    /*
    component.setState({
      isHoverAbove: true
    });
    */

    // Time to actually perform the action
    props.onMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

/**
 * Specifies which props to inject into your component.
 */
function dragSourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()

  };
}

function dropTargetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class RepeaterItemBase extends Component {

  onRemove = () => {
    this.props.onRemove(this.props.id);
  }

  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isDragging && this.props.isDragging) {
      $("body").addClass("is-dragging");
    } else if (prevProps.isDragging && !this.props.isDragging) {
      $("body").removeClass("is-dragging");
    }
  }

  render() {

    const { 
      template, 
      value, 
      id, 
      isDragging, 
      isOver, 
      connectDragSource, 
      connectDropTarget, 
      connectDragPreview,
      showRemove
    } = this.props;

    let child = React.cloneElement(template, { 
      value: value,
      onChange: this.onChange,
      onRemove: this.onRemove
    });

    const classnames = classNames({
      'repeater-item': true,
      'repeater-item--dragging': isDragging,
      'repeater-item--dragging-over': isOver
    })

    return (
      connectDropTarget(
        <div className={classnames}>
          <div className="repeater-item__inner">
            { connectDragSource(
                <div className="repeater-item__drag">
                  <i className="iconcss icon-drag-dots"></i>
                </div>
              ) 
            }
            { connectDragPreview(<div className="repeater-item__main">{child}</div>) }
            {
              showRemove ?
                <div className="repeater-remove" onClick={this.onRemove}>
                  <i className="iconcss icon-close"></i>
                </div>
              :
                null
            }
          </div>
        </div>
      )  
    )
  }
}

const RepeaterItem = flow(
  DragSource("REPEATER_ITEM", itemSource, dragSourceCollect),
  DropTarget("REPEATER_ITEM", itemTarget, dropTargetCollect)
)(RepeaterItemBase);


export default Repeater;


