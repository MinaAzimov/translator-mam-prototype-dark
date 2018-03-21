import React, { Component, PropTypes } from 'react';

import BaseLayout from './BaseLayout';
import Notifications from './Notifications';
import MyTasks from './MyTasks';
import FavoritesCard from './FavoritesCard';
import LatestContentCard from './LatestContentCard';
import LatestActivitiesCard from './LatestActivitiesCard';
import StatisticsCard from './StatisticsCard'
import TopArticlesCard from './TopArticlesCard'
import TopVideosCard from './TopVideosCard'
import StatusTracker from './StatusTracker';
import Selectbox from './form/Selectbox';
import DashboardFeed from './DashboardFeed';
import { Card, CardSection, CardBoard } from './Card';
import ChartCard from './stats/ChartCard';
import EditorStatistics from "./stats/EditorStatistics";
import $ from "jquery";


const typeList = [
	{
		title: "Breaking News",
		id: 0
	},
	{
		title: "News Story",
		id: 1
	},
	{
		title: "Wire Story",
		id: 2
	},
	{
		title: "Partner Story",
		id: 3
	},
	{
		title: "Press Releases",
		id: 4
	},
	{
		title: "Episode",
		id: 5
	},
	{
		title: "Promo",
		id: 6
	},
	{
		title: "Series",
		id: 7
	},
	{
		title: "Season",
		id: 8
	},
	{
		title: "Curated Collection",
		id: 9
	}

]

export default class Dashboard extends Component {

	componentDidMount() {
    // This code should eventually be replaced
    $('.fa-search').click( function() {
      $(this).parent().toggleClass("active");
    });
  }

	render() {
		return (
			<div className="dashboard">
				<BaseLayout pageTitle="Dashboard">
					<div className="page-title__wrapper">
						<div className="page-title">
							Dashboard
						</div>
					</div>
					<div className="centered">
						<CardBoard>
							<Card title="Favorites" size="lg" id="favourites">
								<CardSection>
									<div className="dashboard-filter-container">
										
										<Selectbox
											label="Type"
											value={null}
											search={true}
											items={typeList}
											onChange={this.selectPriority}
										/>
										<div className="dashboard-filter-icon">
											<i className="iconcss icon-filter" />
										</div>
										<div className="dashboard-search">
											<input placeholder="Search" />
											<i className="fa fa-search" />
										</div>
									</div>
									<FavoritesCard />
								</CardSection>
							</Card>
							<Card title="My Tasks" size="lg" id="tasks">
								<CardSection>
									<div className="tasks-key">
										<div className="key-title">Key</div>
										<div className="key-high">High Priority</div>
										<div className="key-medium">Medium Priority</div>
										<div className="key-low">Low Priority</div>
									</div>
									<MyTasks />
								</CardSection>
							</Card>
							<Card title="Your Story Statistics" size="lg" id="my-article-statistics">
								<CardSection>
									<StatisticsCard />
								</CardSection>
							</Card>
							<Card title="Top Performing Stories" size="lg" id="top-articles-statistics">
								<CardSection>
									<TopArticlesCard />
								</CardSection>
							</Card>

							<Card title="Top Performing Videos" size="lg" id="top-video-statistics">
								<CardSection>
									<TopVideosCard />
								</CardSection>
							</Card>

							<Card title="Top Bylines" size="lg" id="editor-statistics">
								<CardSection>
									<EditorStatistics />
								</CardSection>
							</Card>

							<Card title="Statistics" size="lg" id="statistics">
								<CardSection>
									<ChartCard />
								</CardSection>
							</Card>
						</CardBoard>
						<DashboardFeed />
					</div>
				</BaseLayout>
			</div>
		)
	}
}
