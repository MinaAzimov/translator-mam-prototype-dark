import React, { Component, PropTypes } from 'react';
import Selectbox from './form/Selectbox';
import classNames from "classnames";
import { Link } from 'react-router';
import Flickity from 'react-flickity';

const selectItems = [
	{
		title: "All",
		id: 0
	},
	{
		title: "My Activities",
		id: 1
	},
	{
		title: "Published Content",
		id: 2
	},
	{
		title: "Tracked Content",
		id: 3
	}
]





const itemList = (
	<div className="dashboard-feed__list">
		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/skin.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Allen Kim published the Skin:</span> <span className="activity-content-title">Renewable Energy Skin</span></div>
						<div className="activity-time">few seconds ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item my-latest status-track">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/news-story.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>You saved the News Story:</span> <span className="activity-content-title">Bonds set to snap three-decade winning streak as Fed, Trump plot next moves</span></div>
						<div className="activity-time">26 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/gamers.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Thomas Jennigs published the Slideshow:</span> <span className="activity-content-title">Must-have video games this holiday season</span></div>
						<div className="activity-time">27 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/austin-movie.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Nicolas Carr saved the News Story:</span> <span className="activity-content-title">Move over, Hollywood. Atlanta is becoming a major film mecca</span></div>
						<div className="activity-time">34 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/atlanta-film.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Claire Parsons published the Video:</span> <span className="activity-content-title">Atlanta is becoming a major film mecca</span></div>
						<div className="activity-time">48 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/eye.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Nicolas Carr saved the News Story:</span> <span className="activity-content-title">Facebook, Snapchat and Twitter played a bigger role than ever in the election</span></div>
						<div className="activity-time">51 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/jack-dorsey.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Glen Roy published the News Story:</span> <span className="activity-content-title">Jack Dorsey: 2 books that influenced me most have nothing to do with business</span></div>
						<div className="activity-time">53 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/atlanta-film.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Clair Parsons saved the Video:</span> <span className="activity-content-title">Atlanta is becoming a major film mecca</span></div>
						<div className="activity-time">58 mins ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item my-latest">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/jack-dorsey.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>You saved the News Story:</span> <span className="activity-content-title">Jack Dorsey: 2 books that influenced me most have nothing to do with business</span></div>
						<div className="activity-time">1 hr ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published status-track">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/diy-self.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Chris Mann published the Partner Story:</span> <span className="activity-content-title">Do-it-yourself retirement for the self-employed</span></div>
						<div className="activity-time">2 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/tesla.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Melanie Whittacker published the News Story:</span> <span className="activity-content-title">Tesla shares downshift into uncertainty after Republican sweep</span></div>
						<div className="activity-time">2 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published my-latest status-track">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/diy-self.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>You published the Partner Story:</span> <span className="activity-content-title">Do-it-yourself retirement for the self-employed</span></div>
						<div className="activity-time">2 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item my-latest status-track">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/diy-self.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>You saved the Partner Story:</span> <span className="activity-content-title">Do-it-yourself retirement for the self-employed</span></div>
						<div className="activity-time">2 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/tesla.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Thomas Jennings saved the News Story:</span> <span className="activity-content-title">Tesla shares downshift into uncertainty after Republican sweep</span></div>
						<div className="activity-time">2 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/macy.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text">
							<span>Glen Roy published the News Story:</span> <span className="activity-content-title">Macy's earnings: 17 cents per share, vs expected EPS of 41 cents</span>
						</div>
						<div className="activity-time">
							3 hrs ago
						</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/google-coach.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Marcos Guerrero saved the News Story:</span> <span className="activity-content-title">Ex-Google career coach shares 4-step strategy for dealing with a job you hate</span></div>
						<div className="activity-time">3 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/google-coach.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Claire Parsons saved the News Story:</span> <span className="activity-content-title">Ex-Google career coach shares 4-step strategy for dealing with a job you hate</span></div>
						<div className="activity-time">3 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/macy.jpg" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Allen Kim saved the News Story:</span> <span className="activity-content-title">Macy's earnings: 17 cents per share, vs expected EPS of 41 cents</span></div>
						<div className="activity-time">3 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>


		<div className="dashboard-feed__item my-latest status-track">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/news-story.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>You saved the News Story:</span> <span className="activity-content-title">Bonds set to snap three-decade winning streak as Fed, Trump plot next moves</span></div>
						<div className="activity-time">3 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item published">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/news-story.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Chris Mann published the News Story:</span> <span className="activity-content-title">Self-made millionaire: Don't buy a home</span></div>
						<div className="activity-time">4 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

		<div className="dashboard-feed__item">
			<Link to="edit">
				<div className="activity-item">
					<div className="activity-img">
						<img src="/assets/img/library/news-story.png" />
					</div>
					<div className="activity-copy">
						<div className="activity-text"><span>Chris Mann saved the News Story:</span> <span className="activity-content-title">Self-made millionaire: Don't buy a home</span></div>
						<div className="activity-time">4 hrs ago</div>
					</div>
				</div>
			</Link>
		</div>

	</div>
);






export default class DashboardFeed extends Component {


	constructor(props) {
		super(props);
		this.state = {
			selectedFilter: selectItems[0]
		}
	}

	onSelect = (val) => {
		this.setState({
			selectedFilter: val
		})
	}


	getItemList() {
		return itemList;
	}


	render() {

		let classnames = classNames({
			"dashboard-feed": true
		}, "dashboard-feed--" + this.state.selectedFilter.id)

		return (
			<div className={classnames}>
				<div className="dashboard-feed__header">
					<h2>Activity feed</h2>
					<div className="dashboard-feed__filter">
						<div className="dashboard-feed-filter-icon">
							<i className="iconcss icon-filter" />
						</div>
						<Selectbox
							onChange={this.onSelect}
							value={this.state.selectedFilter}
							helpText=""
							items={selectItems}
							search={false}
							allowCustomText={false}
							showComplex={false}
							inputPlaceholder=""
							disableNone
						/>
					</div>
				</div>
				{itemList}
			</div>

		);
	}

}
