import React, { Component, PropTypes } from 'react';
import $ from "jquery";

export default class LatestActivitiesCard extends Component {

	render() {
		return (
			<div>
				<div className="show-to-USER_ROLE_HOTSEAT">

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/macy.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> News Story "Macy's earnings: 17 cents per share, vs expected EPS of 41 cents"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/macy.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Macy's earnings: 17 cents per share, vs expected EPS of 41 cents"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/news-story.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Bonds set to snap three-decade winning streak as Fed, Trump plot next moves"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_REPORTER">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/diy-self.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> Partner Story "Do-it-yourself retirement for the self-employed"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/diy-self.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> Partner Story "Do-it-yourself retirement for the self-employed"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/google-coach.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Ex-Google career coach shares 4-step strategy for dealing with a job you hate"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/news-story.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Self-made millionaire: Don't buy a home"</div>
							<div className="activity-time">4 hrs ago</div>
						</div>
					</div>
				</div>	
				<div className="show-to-USER_ROLE_NEWSASSOCIATE">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/diy-self.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> Partner Story "Do-it-yourself retirement for the self-employed"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/diy-self.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> Partner Story "Do-it-yourself retirement for the self-employed"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/google-coach.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Ex-Google career coach shares 4-step strategy for dealing with a job you hate"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/news-story.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Self-made millionaire: Don't buy a home"</div>
							<div className="activity-time">4 hrs ago</div>
						</div>
					</div>
				</div>	
				<div className="show-to-USER_ROLE_COPYEDITOR">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/jack-dorsey.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> News Story "Jack Dorsey: 2 books that influenced me most have nothing to do with business"</div>
							<div className="activity-time">53 mins ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/jack-dorsey.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Jack Dorsey: 2 books that influenced me most have nothing to do with business"</div>
							<div className="activity-time">1 hr ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/tesla.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> News Story "Tesla shares downshift into uncertainty after Republican sweep"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/tesla.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Tesla shares downshift into uncertainty after Republican sweep"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_EDITOR">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/austin-movie.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">34 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/atlanta-film.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> Video "Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">48 mins ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/atlanta-film.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> Video "Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">58 mins ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/tesla.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Tesla shares downshift into uncertainty after Republican sweep"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
				</div>	
				<div className="show-to-USER_ROLE_VIDEOPRODUCER">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/austin-movie.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">34 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/atlanta-film.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> Video "Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">48 mins ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/atlanta-film.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> Video "Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">58 mins ago</div>
						</div>
					</div>
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/tesla.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Tesla shares downshift into uncertainty after Republican sweep"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_PHOTODESK">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/austin-movie.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">47 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/atlanta-film.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> Video "Atlanta is becoming a major film mecca"</div>
							<div className="activity-time">1 hr ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/tesla.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Tesla shares downshift into uncertainty after Republican sweep"</div>
							<div className="activity-time">1 hr ago</div>
						</div>
					</div>
				</div>	
				<div className="show-to-USER_ROLE_SITEPRODUCER">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/news-story.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Bonds set to snap three-decade winning streak as Fed, Trump plot next moves"</div>
							<div className="activity-time">34 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/skin.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Published:</span> Skin "Renewable Energy Skin"</div>
							<div className="activity-time">2 hrs ago</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_SOCIAL">
					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/gamers.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Shared to Facebook:</span> Slideshow "Must-have video games this holiday season"</div>
							<div className="activity-time">27 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/eye.jpg" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Shared to Snapchat:</span> News Story "Facebook, Snapchat and Twitter played a bigger role than ever in the election"</div>
							<div className="activity-time">51 mins ago</div>
						</div>
					</div>

					<div className="activity-item">
						<div className="activity-img">
							<img src="/assets/img/library/news-story.png" />
						</div>
						<div className="activity-copy">
							<div className="activity-text"><span>Saved:</span> News Story "Here's what people are searching for — and posting about— the election"</div>
							<div className="activity-time">3 hrs ago</div>
						</div>
					</div>
				</div>
				<div className="load-more__wrapper">
					<button className="load-more__button">Load more</button>
				</div>
			</div>
		)
	}
}

