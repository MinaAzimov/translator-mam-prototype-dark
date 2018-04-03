import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import SlideDown from './SlideDown';


class CardBoard extends Component {

	constructor(props) {
		super(props);
		let cards = props.children.map((child, index) => {
			return {
				id: child.props.id,
				component: child
			}
		});

		this.state = {
			cards: cards
		}
	}

	componentWillUpdate(nextProps) {
		// THIS IS HACKY
		// Due to needing to reorder the cards, the card order state
		// lives in the component state, as such we need to re set the state
		// every time we get a new set of cards
		// If we were doing this properly, the card order should lie inside the
		// redux store
		if (nextProps.children !== this.props.children) {
			const newChildren = nextProps.children;
			const currCards = this.state.cards;
			const newCards = [];
			for (let i = 0; i < newChildren.length; i++) {
				let child = newChildren[i];
				let index = currCards.findIndex(card => card.id === child.props.id);
				newCards[index] = {
					id: child.props.id,
					component: child
				}
			}
			this.setState({
				cards: newCards
			});
		}
	}

  moveCard = (dragIndex, hoverIndex) => {
    const cards = this.state.cards;
    const dragItem = cards[dragIndex];

    cards.splice(dragIndex, 1);
    cards.splice(hoverIndex, 0, dragItem);

    this.setState({
    	cards: cards
    })
  }

	render () {
	    const cardList = this.state.cards.map(
	     	(card,index) => React.cloneElement(card.component, {
		       	index: index,
		       	moveCard: this.moveCard,
		       	key: card.id
	     	})
	    );


		return (
			<div className="card-board">
				{ cardList }
			</div>
		)
	}
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var cardSource = {
  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { index: props.index };
    return item;
  }
};


function dropTargetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}



/**
 * Specifies the drop target contract.
 * Only `beginDrag` function is required.
 */
var cardTarget = {

  hover: function (props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

function dragSourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()

  };
}




class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true
		}
	}
	toggleOpen = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	render() {

		const { 
			id,
			title, 
			size, 
			isDragging,
      connectDragSource, 
      connectDropTarget, 
      connectDragPreview,
      lastModified
		} = this.props;
		
		const { isOpen } = this.state;

		const classnames = classNames({
			'card': true,
			'card--open': isOpen,
			'card--dragging': isDragging,
			'card--lg': size === "lg",
		}, id ? ('card--id-' + id) : "");		
		return (
			connectDropTarget(connectDragPreview(
				<div className={classnames}>
					<div className="card-toggle" onClick={this.toggleOpen}>
						<i className="iconcss icon-line-arrow-up"></i>
					</div>
					{connectDragSource(<div className="card-title">{title}<span className="last-edited">
                                  {(lastModified != null) ? <i className="iconcss icon-last-modified"></i> : null}
                                  <span>{lastModified}</span>
                                </span></div>)}
					<SlideDown isOpen={isOpen} duration={500}>
						<div className="card-content">
							{ this.props.children }
						</div>
					</SlideDown>
				</div>
			))
		)
	}
}
Card = flow(
  DragSource("CARD", cardSource, dragSourceCollect),
  DropTarget("CARD", cardTarget, dropTargetCollect)
)(Card);

class CardSection extends Component {
	render() {
		let { title, className = '' } = this.props;
		let classnames = classNames({
			[`card-section ${className}`]: true,
			'card-section--has-title': title !== undefined
		});
		return (
			<div className={classnames}>
				<div className="card-section__title"><span>{title}</span></div>
				<div className="card-section__content">
					{ this.props.children }
				</div>
			</div>
		)
	}
}

export { Card, CardBoard, CardSection }