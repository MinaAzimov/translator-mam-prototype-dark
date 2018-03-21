import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class StatusTracker extends Component {

	render() {
		let { client } = this.props;
		return (
			<div>
				<div className="show-to-USER_ROLE_HOTSEAT">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/hillary.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Partner Story "Clinton campaign agrees to back Jill Stein's election recount effort: Lawyer"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Janie Young</div>
								<div className="activity-time">38 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Janie Young</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>

					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/macy.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Macy's earnings: 17 cents per share, vs expected EPS of 41 cents"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Andre Boyd</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Publisehd by Roy Goodman</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Publisehd by me</div>
								<div className="activity-time">3 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by me</div>
								<div className="activity-time">3 hrs ago</div>
							</div>
						</div>
					</div>
				</div>

				<div className="show-to-USER_ROLE_REPORTER">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/macbook-pro.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Apple unveils new MacBook Pro with Touch Bar, starting at $1,799"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Ricky Rodriquez</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Ricky Rodriquez</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Janie Young</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
						</div>
					</div>

					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/hillary.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Partner Story "Clinton campaign agrees to back Jill Stein's election recount effort: Lawyer"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Janie Young</div>
								<div className="activity-time">38 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Janie Young</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
				</div>

				<div className="show-to-USER_ROLE_NEWSASSOCIATE">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/macbook-pro.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Apple unveils new MacBook Pro with Touch Bar, starting at $1,799"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Ricky Rodriquez</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Ricky Rodriquez</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Janie Young</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
						</div>
					</div>

					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/hillary.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Partner Story "Clinton campaign agrees to back Jill Stein's election recount effort: Lawyer"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Janie Young</div>
								<div className="activity-time">38 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Janie Young</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_COPYEDITOR">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/jack-dorsey.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Jack Dorsey: 2 books that influenced me most have nothing to do with business"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by me</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Courtney Fletcher</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Courtney Fletcher</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Janie Young</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_EDITOR">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/austin-movie.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Saved by me</div>
								<div className="activity-time">34 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Courtney Fletcher</div>
								<div className="activity-time">47 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Bill Owen</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Courtney Fletcher</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Lester Stephens</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_VIDEOPRODUCER">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/austin-movie.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Saved by me</div>
								<div className="activity-time">34 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Courtney Fletcher</div>
								<div className="activity-time">47 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Bill Owen</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Courtney Fletcher</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Lester Stephens</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_PHOTODESK">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/austin-movie.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">News Story "Move over, Hollywood. Atlanta is becoming a major film mecca"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Saved by Taylor Robertson</div>
								<div className="activity-time">34 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by me</div>
								<div className="activity-time">47 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Bill Owen</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to me</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Courtney Fletcher</div>
								<div className="activity-time">1 hr ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Saved by Lester Stephens</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_SITEPRODUCER">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/hillary.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Partner Story "Clinton campaign agrees to back Jill Stein's election recount effort: Lawyer"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Janie Young</div>
								<div className="activity-time">38 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Janie Young</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/castro.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Wire Story "Former Cuban President Fidel Castro has died at age 90"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Bill Owen</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Lester Stephens</div>
								<div className="activity-time">3 hrs ago</div>
							</div>
						</div>
					</div>
				</div>
				<div className="show-to-USER_ROLE_SOCIAL">
					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/hillary.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Partner Story "Clinton campaign agrees to back Jill Stein's election recount effort: Lawyer"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Janie Young</div>
								<div className="activity-time">38 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Assigned to Janie Young</div>
								<div className="activity-time">53 mins ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">1 hr ago</div>
							</div>
						</div>
					</div>

					<div className="status-item">
						<div className="status-topic">
							<div className="activity-img">
								<img src="/assets/img/library/castro.jpg" />
							</div>
							<div className="activity-copy">
								<div className="activity-text">Wire Story "Former Cuban President Fidel Castro has died at age 90"</div>
							</div>
						</div>
						<div className="status-update">
							<div className="status-arrow"></div>
							<div className="status-text">
								<div className="status-username">Published by Stephanie Horton</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Bill Owen</div>
								<div className="activity-time">2 hrs ago</div>
							</div>
							<div className="status-text">
								<div className="status-username">Published by Lester Stephens</div>
								<div className="activity-time">3 hrs ago</div>
							</div>
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


