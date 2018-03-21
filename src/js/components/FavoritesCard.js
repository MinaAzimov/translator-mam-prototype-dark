import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import $ from "jquery";
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import flow from 'lodash/flow';

const hostseatfavourites = [
	{
		icon: "/assets/img/icons/breaking-news.svg",
		title: "General Breaking News Contemplate"
	},
	{
		icon: "/assets/img/icons/wild-card.svg",
		title: "World Markets heat map by country and region"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "correction contemplate"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "Dhara US Pre-Open Contemplate"
	},
	{
		icon: "/assets/img/icons/webresources.svg",
		title: "Home Page TV Promo"
	}
]


const reporterfavourites = [
	{
		icon: "/assets/img/icons/breaking-news.svg",
		title: "Technology breaking news contemplate"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "ECONOMY TEMPLATE EC"
	},
	{
		icon: "/assets/img/icons/chart.svg",
		title: "Chart Template"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "Binge news Story contemplate"
	},
	{
		icon: "/assets/img/icons/post.svg",
		title: "Patti Domm Market Insider: Blog Post"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "Sports: News Story Contemplate"
	},
	{
		icon: "/assets/img/icons/post.svg",
		title: "Trader Talk TEMPLATE pisani"
	}
]


const newsfavourites = [
	{
		icon: "/assets/img/icons/breaking-news.svg",
		title: "Technology breaking news contemplate"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "ECONOMY TEMPLATE EC"
	},
	{
		icon: "/assets/img/icons/chart.svg",
		title: "Chart Template"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "Binge news Story contemplate"
	},
	{
		icon: "/assets/img/icons/post.svg",
		title: "Patti Domm Market Insider: Blog Post"
	},
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "Sports: News Story Contemplate"
	},
	{
		icon: "/assets/img/icons/post.svg",
		title: "Trader Talk TEMPLATE pisani"
	}
]

const videoeditorfavourites = [
	{
		icon: "/assets/img/icons/video.svg",
		title: "Metro 20 video contemplate"
	},
	{
		icon: "/assets/img/icons/video.svg",
		title: "Top 100 Wealth Managers"
	}
]


const copyeditorfavourites = [
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "US News and Analysis"
	}
]


const videoproducerfavourites = [
	{
		icon: "/assets/img/icons/video.svg",
		title: "Metro 20 video contemplate"
	},
	{
		icon: "/assets/img/icons/video.svg",
		title: "Top 100 Wealth Managers"
	}
]

const photodeskfavorites = [
	{
		icon: "/assets/img/icons/slideshow.svg",
		title: "NEW LARGE PHOTO SLIDESHOW Contemplate"
	},
	{
		icon: "/assets/img/icons/chart.svg",
		title: "New Chart Contemplate"
	},
	{
		icon: "/assets/img/icons/image.svg",
		title: "CNBC Image Contemplate"
	}
]

const siteproducerfavorites = [
	{
		icon: "/assets/img/icons/skin.svg",
		title: "Make It Skin Contemplate"
	},
	{
		icon: "/assets/img/icons/template.svg",
		title: "Default Template"
	}
]

const socialfavorites = [
	{
		icon: "/assets/img/icons/news-story.svg",
		title: "US News and Analysis"
	}
]

export default class FavoritesCard extends Component {

	// This code should eventually be replaced
	componentDidMount () {
		/*
		$(".favorites__item").mousedown(function(e) {
       var ripple = $(this).find(".ripple");
       ripple.removeClass("animate");
       var x = parseInt(e.pageX - $(this).offset().left) - (ripple.width() / 2);
       var y = parseInt(e.pageY - $(this).offset().top) - (ripple.height() / 2);
       ripple.css({
          top: y,
          left: x
       }).addClass("animate");
    });
    */
	}

	render() {
		return (
			<div>
				<div className="show-to-USER_ROLE_HOTSEAT">
					<FavoritesList items={hostseatfavourites} />
				</div>
				<div className="show-to-USER_ROLE_REPORTER">
					<FavoritesList items={reporterfavourites} />
				</div>
				<div className="show-to-USER_ROLE_NEWSASSOCIATE">
					<FavoritesList items={newsfavourites} />
				</div>
				<div className="show-to-USER_ROLE_COPYEDITOR">
					<FavoritesList items={copyeditorfavourites} />
				</div>
				<div className="show-to-USER_ROLE_EDITOR">
					<FavoritesList items={videoeditorfavourites} />
				</div>
				<div className="show-to-USER_ROLE_VIDEOPRODUCER">
					<FavoritesList items={videoproducerfavourites} />
				</div>
				<div className="show-to-USER_ROLE_PHOTODESK">
					<FavoritesList items={photodeskfavorites} />
				</div>
				<div className="show-to-USER_ROLE_SITEPRODUCER">
					<FavoritesList items={siteproducerfavorites} />
				</div>
				<div className="show-to-USER_ROLE_SOCIAL">
					<FavoritesList items={socialfavorites} />
				</div>
			</div>
		)
	}
}



export class FavoritesList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items.map((item,index)=>{
				return Object.assign({}, item, {id:index})
			})
		}
	}

	move = (dragIndex, hoverIndex) => {

    const items = this.state.items;
    const dragItem = items[dragIndex];

    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);

    this.setState({
    	items: items
    })
	}


	render() {
		return(
			<div className="favorites">
				{
					this.state.items.map((item,index)=>{
						return <FavouritesItem key={item.id} index={index} icon={item.icon} title={item.title} move={this.move} />
					})
				}
			</div>
		)
	}
}



/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var favoritesItemSource = {
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
var favoritesItemTarget = {

  hover: function (props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    // Time to actually perform the action
    props.move(dragIndex, hoverIndex);
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


export class FavouritesItem extends Component {
	constructor(props) {
		super(props);
		this.state={
			removed: false
		}
	}

	remove = () =>{
		this.setState({
			removed: true
		})
	}

	render() {

		const {
			isDragging,
      connectDragSource,
      connectDropTarget,
      connectDragPreview
    } = this.props;

		const classnames = classNames({
			'favorites__item': true,
			'favorites__item--removed': this.state.removed,
			'favorites__item--dragging': isDragging
		});
		return (
			connectDropTarget(connectDragPreview(connectDragSource(
				<div className={classnames}>
					<div className="favorites-item__remove" onClick={this.remove}>
						<i className="iconcss icon-close"></i>
					</div>
					<img src={this.props.icon} className="favorites__item-icon" />
					<label className="favorites__item-label">{this.props.title}</label>
					<div className="ripple"></div>
				</div>
			)))
		)
	}
}

FavouritesItem = flow(
  DragSource("FAVORITESITEM", favoritesItemSource, dragSourceCollect),
  DropTarget("FAVORITESITEM", favoritesItemTarget, dropTargetCollect)
)(FavouritesItem);
