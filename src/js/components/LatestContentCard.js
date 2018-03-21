import React, { Component, PropTypes } from 'react';
import $ from "jquery";

export default class LatestContentCard extends Component {

	render() {
		return (
			<div>
				<div className="activity-item">
					<div className="activity-copy">
						<div className="activity-text"><span>Published:</span> News Story "Workers in four states win a raise"</div>
						<div className="activity-time">8 min ago</div>
					</div>
				</div>

				<div className="activity-item">
					<div className="activity-copy">
						<div className="activity-text"><span>Published:</span> Video "Marcus and Tilman on Saving Small Business"</div>
						<div className="activity-time">27 min ago</div>
					</div>
				</div>

				<div className="activity-item">
					<div className="activity-copy">
						<div className="activity-text"><span>Published:</span> News Story "Where Facebook stands against Snapchat"</div>
						<div className="activity-time">1 hr ago</div>
					</div>
				</div>

				<div className="activity-item">
					<div className="activity-copy">
						<div className="activity-text"><span>Published:</span> Slideshow "A virtual Tour of Havana, Cuba"</div>
						<div className="activity-time">1 hr ago</div>
					</div>
				</div>

				<div className="load-more__wrapper">
					<button className="load-more__button">Load more</button>
				</div>

			</div>
		)
	}
}

