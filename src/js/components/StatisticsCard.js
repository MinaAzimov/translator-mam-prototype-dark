import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import $ from "jquery";
import { Accordion, AccordionItem } from './Accordion';
import { BarWithAverage, BarWithTotal } from './stats/BarWithAverage';
import Selectbox from './form/Selectbox';
import Text from './form/Text';
import Spinner from './Spinner';
import classNames from 'classnames';


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


export default class LatestActivitiesCard extends Component {
	componentDidMount() {
		$('.share').click( function() {
    	$("#share-test").toggleClass("active");
		} );
	}

	constructor(props) {
    super(props);

    this.state = {
      show: false,
      modal: {
        src: "",
        title: "",
				link: "",
        source: ""
      },
      selectedStoryType: null,
      searchTerm: "",
      loading: false
    };
  }

	close = () => {
    this.setState({ show: false });
  };

  open = () => {
    this.setState({ show: true });
  };

  selectImage = (modal) => {
    this.setState({
      show: true,
      modal
    });
  };

  onSearch = (val) => {
  	this.setState({
  		searchTerm: val
  	})

  	this.waitAndFilter({});
  }

  selectPriority = (val) => {

  	this.waitAndFilter({
  		selectedStoryType: val
  	});

  }

  waitAndFilter = (newState) => {
  	this.setState({
  		loading: true
  	});
  	setTimeout(()=> {
	  	newState.loading = false;
	  	this.setState(newState); 
  	}, 1000);
  }

  getModalBody = () => {

    return (
      <div>
        <img src={this.state.modal.src} />
        <div className="stat-title">{this.state.modal.title}</div>
        <a target="_blank" className="stat-source" href={this.state.modal.link}>{this.state.modal.source}</a>
      </div>
    );
  };

	render() {
		const modalBody = this.getModalBody();
		const {selectedStoryType, searchTerm, loading} = this.state;
		const classnames = classNames({
			'statistics-card': true,
			'statistics-card--loading': loading,
		}, selectedStoryType ? ('statistics-card--' + selectedStoryType.id) : "statistics-card--any");
		return (
			<div className={classnames}>

				<div className="stats-header">
					<div className="stats-search">
						<Text 
							value={searchTerm}
							onChange={this.onSearch}
							placeholder="Search article title..."

						/>
						<i className="fa fa-search" />
					</div>
					<Selectbox
						label="Type"
						value={selectedStoryType}
						search={true}
						items={typeList}
						onChange={this.selectPriority}
						noneText="Any"
					/>
				</div>
				<Spinner show={loading} />
				<div className="statistics-items">
				<div className="statistics-item show-on-1">
					<Accordion>
								<AccordionItem title="Trump blasts Mark Cuban in early morning tweet; Cuban dismisses" visits="12579" shares="62260" likes="10532">
					        	<div className="stat-item">
					          		<div className="stat-chart">
											<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Article Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Visits" value={11782} average={1717} />
														<BarWithAverage label="Number of Page Views" value={12579} average={2116} />
														<BarWithAverage label="Number of Unique Visits" value={10532} average={1583} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={56073} average={29025} />
											<BarWithAverage label="Number of Page Views" value={62260} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={55319} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Referrals</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={38513} total={38513} />
														<BarWithTotal label="google.com" value={8848} total={38513} />
														<BarWithTotal label="google.ca" value={3775} total={38513} />
														<BarWithTotal label="facebook.com" value={1173} total={38513} />
														<BarWithTotal label="google.co.uk" value={947} total={38513} />
													</div>
												  <div className="chart-section">
												    <div className="chart-section-header">
												      <div className="chart-left-header">Visits per device</div>
															<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
												      <div className="chart-left-header"></div>
												    </div>
												    <BarWithTotal label="Desktop" value={45102} total={45102} />
														<BarWithTotal label="Mobile" value={32124} total={45102} />
														<BarWithTotal label="Tablet" value={15464} total={45102} />
												  </div>
												</div>
											</div>
										</div>
								</AccordionItem>
							</Accordion>
							</div>

							
							<div className="statistics-item show-on-2">
							<Accordion>
								<AccordionItem title="Suzy Welch: 4 signs you should quit your job immediately" visits="3725" shares="200108" likes="3067">
					        <div className="stat-item">
					          <div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics: Today</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={3526} average={1717} />
											<BarWithAverage label="Number of Page Views" value={3725} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={3067} average={1583} />
											<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={188714} average={29025} />
											<BarWithAverage label="Number of Page Views" value={200108} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={186255} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="Typed/Bookmarked" value={69380} total={69380} />
													<BarWithTotal label="yahoo.com" value={60018} total={69380} />
													<BarWithTotal label="linkedin.com" value={36745} total={69380} />
													<BarWithTotal label="com.linkedin.android" value={1277} total={69380} />
													<BarWithTotal label="facebook.com" value={1250} total={69380} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={176342} total={176342} />
													<BarWithTotal label="Mobile" value={18321} total={176342} />
													<BarWithTotal label="Tablet" value={20421} total={176342} />
											  </div>
											</div>
					          </div>
					        </div>
								</AccordionItem>
							</Accordion>
							</div>
							<Accordion>
								<AccordionItem title="Gaga made $0 from her Super Bowl LI performance" visits="3153" shares="157069" likes="2964">
					        	<div className="stat-item">
					          		<div className="stat-chart">
											<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Article Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Visits" value={3085} average={1717} />
														<BarWithAverage label="Number of Page Views" value={3153} average={2116} />
														<BarWithAverage label="Number of Unique Visits" value={2964} average={1583} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={148726} average={29025} />
											<BarWithAverage label="Number of Page Views" value={157069} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={147262} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Referrals</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={116416} total={116416} />
														<BarWithTotal label="my.xfinity.com/?cid-cust" value={12077} total={116416} />
														<BarWithTotal label="google.com" value={6385} total={116416} />
														<BarWithTotal label="linkedin.com" value={5052} total={116416} />
														<BarWithTotal label="facebook.com" value={2606} total={116416} />
													</div>
												  <div className="chart-section">
												    <div className="chart-section-header">
												      <div className="chart-left-header">Visits per device</div>
															<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
												      <div className="chart-left-header"></div>
												    </div>
												    <BarWithTotal label="Desktop" value={68432} total={68432} />
														<BarWithTotal label="Mobile" value={28542} total={68432} />
														<BarWithTotal label="Tablet" value={37532} total={68432} />
												  </div>
												</div>
											</div>
										</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Damaged emergency spillway at nation's tallest dam forces massive evacuations in California" visits="8116" shares="11126" likes="6834">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={7432} average={1717} />
											<BarWithAverage label="Number of Page Views" value={8116} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={6834} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={10531} average={7025} />
											<BarWithAverage label="Number of Page Views" value={11126} average={3106} />
											<BarWithAverage label="Number of Unique Visits" value={9633} average={2732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Top 5 Referrals</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithTotal label="Typed/Bookmarked" value={5050} total={5050} />
											<BarWithTotal label="news.google.com" value={650} total={5050} />
											<BarWithTotal label="news.google.co.uk" value={248} total={5050} />
											<BarWithTotal label="google.com" value={219} total={5050} />
											<BarWithTotal label="news360.com/article" value={177} total={5050} />
										</div>
										<div className="chart-section">
									    <div className="chart-section-header">
									      <div className="chart-left-header">Unique Visits per device</div>
												<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
									      <div className="chart-left-header"></div>
									    </div>
									    <BarWithTotal label="Desktop" value={52811} total={52811} />
											<BarWithTotal label="Mobile" value={26572} total={52811} />
											<BarWithTotal label="Tablet" value={42643} total={52811} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Amazon sinks as revenue misses, guidance disappoints" visits="3015" shares="281540" likes="2954">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={2996} average={1717} />
											<BarWithAverage label="Number of Page Views" value={3015} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={2954} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={265462} average={29025} />
											<BarWithAverage label="Number of Page Views" value={281540} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={258827} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Top 5 Referrals</div>
												<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithTotal label="drudgereport.com" value={122648} total={122648} />
											<BarWithTotal label="Typed/Bookmarked" value={59885} total={122648} />
											<BarWithTotal label="news.google.com" value={21574} total={122648} />
											<BarWithTotal label="google.com" value={9900} total={122648} />
											<BarWithTotal label="google.ca" value={881} total={122648} />
										</div>
										<div className="chart-section">
									    <div className="chart-section-header">
									      <div className="chart-left-header">Unique Visits per device</div>
												<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
									      <div className="chart-left-header"></div>
									    </div>
									    <BarWithTotal label="Desktop" value={297724} total={297724} />
											<BarWithTotal label="Mobile" value={11701} total={297724} />
											<BarWithTotal label="Tablet" value={34872} total={297724} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
				</div>
				<div className="load-more__wrapper">
					<button className="load-more__button">Load more</button>
				</div>
				<Modal show={this.state.show} onHide={this.close} dialogClassName="stats-modal">
	        <Modal.Header closeButton />
	        <Modal.Body>
	          {modalBody}
	        </Modal.Body>
	      </Modal>
			</div>
		)
	}
}
