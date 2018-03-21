import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import $ from "jquery";
import { Accordion, AccordionItem } from './Accordion';
import { BarWithAverage, BarWithTotal } from './stats/BarWithAverage';
import TextSwitch from "./form/TextSwitch";



const DATASET_OPTIONS = [
	"Page Views Today",
	"Unique Visitors Today",
	"Unique Visitors Life"
]



export default class TopArticlesCard extends Component {
	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState) {

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
      selectedDataset: 0
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

  onSelectData = (index) => {
  	this.setState({
  		selectedDataset: index
  	})
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
		const {selectedDataset} = this.state;
		const modalBody = this.getModalBody();
		return (
			<div className="stat-container today-active">
				<div className="stat-header">
					<TextSwitch
						onChange={this.onSelectData}
						value={selectedDataset}
						options={DATASET_OPTIONS}
						label="Time period"
					/>
				</div>
				<div className="stat-panel-container">

				{
					selectedDataset === 0 ? (
						<div className="today stat-list-section">
						<Accordion>
								<AccordionItem title="Trump administration is 'complete insanity' - and the markets are in a fantasy land: Stockman" visits="18880" shares="54345" likes="17342">
					        <div className="stat-item">
					          <div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics: Today</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={17542} average={1717} />
											<BarWithAverage label="Number of Page Views" value={18880} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={17342} average={1583} />
											<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={48140} average={29025} />
											<BarWithAverage label="Number of Page Views" value={54345} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={47340} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="Typed/Bookmarked" value={39934} total={39934} />
													<BarWithTotal label="google.com" value={4286} total={39934} />
													<BarWithTotal label="google.ca" value={3094} total={39934} />
													<BarWithTotal label="news.google.com" value={903} total={39934} />
													<BarWithTotal label="google.co.uk" value={598} total={39934} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={36672} total={36672} />
													<BarWithTotal label="Mobile" value={3424} total={36672} />
													<BarWithTotal label="Tablet" value={13284} total={36672} />
											  </div>
											</div>
					          </div>
					        </div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Early movers: AAPL, DD, TEVA, QSR, FDC, HAS, JCP & more" visits="14707" shares="30091" likes="13054">
				        	<div className="stat-item">
				          	<div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics: Today</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={14205} average={1717} />
													<BarWithAverage label="Number of Page Views" value={14707} average={2116} />
													<BarWithAverage label="Number of Unique Visits" value={13054} average={1583} />
													<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={28631} average={17322} />
											<BarWithAverage label="Number of Page Views" value={30091} average={20532} />
											<BarWithAverage label="Number of Unique Visits" value={27420} average={12732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="Typed/Bookmarked" value={9087} total={9087} />
													<BarWithTotal label="google.com" value={2954} total={9087} />
													<BarWithTotal label="finance.yahoo.com" value={1923} total={9087} />
													<BarWithTotal label="facebook.com" value={1655} total={9087} />
													<BarWithTotal label="news.google.com" value={1512} total={9087} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={7951} total={7951} />
													<BarWithTotal label="Mobile" value={1362} total={7951} />
													<BarWithTotal label="Tablet" value={6304} total={7951} />
											  </div>
											</div>
										</div>
				          </div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Trump blasts Mark Cuban in early morning tweet; Cuban dismisses" visits="12579" shares="62260" likes="11534">
					        	<div className="stat-item">
					          		<div className="stat-chart">
											<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Article Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Visits" value={11742} average={1717} />
														<BarWithAverage label="Number of Page Views" value={12579} average={2116} />
														<BarWithAverage label="Number of Unique Visits" value={11534} average={1583} />
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
														<BarWithTotal label="Mobile" value={11124} total={45102} />
														<BarWithTotal label="Tablet" value={15464} total={45102} />
												  </div>
												</div>
											</div>
										</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Damaged emergency spillway at nation's tallest dam forces massive evacuations in California" visits="8116" shares="11126" likes="7942">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={8031} average={1717} />
											<BarWithAverage label="Number of Page Views" value={8116} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={7942} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={10531} average={9025} />
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
									    <BarWithTotal label="Desktop" value={5281} total={5281} />
											<BarWithTotal label="Mobile" value={3279} total={5281} />
											<BarWithTotal label="Tablet" value={1306} total={5281} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Top Apple analyst preditcs 3 wireless charging iPhones this year - but they'll cost you" visits="4062" shares="4373" likes="3963">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Yesterday</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={4006} average={1717} />
											<BarWithAverage label="Number of Page Views" value={4062} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={3963} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Month</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={3406} average={2025} />
											<BarWithAverage label="Number of Page Views" value={4373} average={3106} />
											<BarWithAverage label="Number of Unique Visits" value={3375} average={2732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Top 5 Referrals</div>
												<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithTotal label="Typed/Bookmarked" value={2303} total={2303} />
											<BarWithTotal label="facebook.com" value={293} total={2303} />
											<BarWithTotal label="yahoo.com" value={186} total={2303} />
											<BarWithTotal label="news.google.com" value={163} total={2303} />
											<BarWithTotal label="google.com" value={125} total={2303} />
										</div>
										<div className="chart-section">
									    <div className="chart-section-header">
									      <div className="chart-left-header">Unique Visits per device</div>
												<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
									      <div className="chart-left-header"></div>
									    </div>
									    <BarWithTotal label="Desktop" value={2643} total={2643} />
											<BarWithTotal label="Mobile" value={461} total={2643} />
											<BarWithTotal label="Tablet" value={947} total={2643} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							
							
							
						
						</div>
					)
					:
						null
					}

					{
						selectedDataset === 1 ? (
						<div className="yesterday stat-list-section">
							

							<Accordion>
								<AccordionItem title="Trump administration is 'complete insanity' - and the markets are in a fantasy land: Stockman" visits="18880" shares="54345" likes="17342">
					        <div className="stat-item">
					          <div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics: Today</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={17542} average={1717} />
											<BarWithAverage label="Number of Page Views" value={18880} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={17342} average={1583} />
											<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={48140} average={29025} />
											<BarWithAverage label="Number of Page Views" value={54345} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={47340} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="Typed/Bookmarked" value={39934} total={39934} />
													<BarWithTotal label="google.com" value={4286} total={39934} />
													<BarWithTotal label="google.ca" value={3094} total={39934} />
													<BarWithTotal label="news.google.com" value={903} total={39934} />
													<BarWithTotal label="google.co.uk" value={598} total={39934} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={36672} total={36672} />
													<BarWithTotal label="Mobile" value={3424} total={36672} />
													<BarWithTotal label="Tablet" value={13284} total={36672} />
											  </div>
											</div>
					          </div>
					        </div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Early movers: AAPL, DD, TEVA, QSR, FDC, HAS, JCP & more" visits="14707" shares="30091" likes="13054">
				        	<div className="stat-item">
				          	<div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics: Today</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={14205} average={1717} />
													<BarWithAverage label="Number of Page Views" value={14707} average={2116} />
													<BarWithAverage label="Number of Unique Visits" value={13054} average={1583} />
													<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={28631} average={9025} />
											<BarWithAverage label="Number of Page Views" value={30091} average={3106} />
											<BarWithAverage label="Number of Unique Visits" value={27420} average={2732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="Typed/Bookmarked" value={9087} total={9087} />
													<BarWithTotal label="google.com" value={5229} total={9087} />
													<BarWithTotal label="finance.yahoo.com" value={3219} total={9087} />
													<BarWithTotal label="facebook.com" value={2916} total={9087} />
													<BarWithTotal label="news.google.com" value={1715} total={9087} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={7951} total={7951} />
													<BarWithTotal label="Mobile" value={1362} total={7951} />
													<BarWithTotal label="Tablet" value={6304} total={7951} />
											  </div>
											</div>
										</div>
				          </div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Trump blasts Mark Cuban in early morning tweet; Cuban dismisses" visits="12579" shares="62260" likes="11534">
					        	<div className="stat-item">
					          		<div className="stat-chart">
											<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Article Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Visits" value={11742} average={1717} />
														<BarWithAverage label="Number of Page Views" value={12579} average={2116} />
														<BarWithAverage label="Number of Unique Visits" value={11534} average={1583} />
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
														<BarWithTotal label="Mobile" value={12124} total={45102} />
														<BarWithTotal label="Tablet" value={15464} total={45102} />
												  </div>
												</div>
											</div>
										</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Damaged emergency spillway at nation's tallest dam forces massive evacuations in California" visits="8116" shares="11126" likes="7942">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={8031} average={1717} />
											<BarWithAverage label="Number of Page Views" value={8116} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={7942} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={10531} average={9025} />
											<BarWithAverage label="Number of Page Views" value={11126} average={7310} />
											<BarWithAverage label="Number of Unique Visits" value={9633} average={4732} />
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
									    <BarWithTotal label="Desktop" value={5281} total={5281} />
											<BarWithTotal label="Mobile" value={2179} total={5281} />
											<BarWithTotal label="Tablet" value={1306} total={5281} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Top Apple analyst preditcs 3 wireless charging iPhones this year - but they'll cost you" visits="4062" shares="4373" likes="3963">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={4006} average={1717} />
											<BarWithAverage label="Number of Page Views" value={4062} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={3963} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={3406} average={2612} />
											<BarWithAverage label="Number of Page Views" value={4373} average={3193} />
											<BarWithAverage label="Number of Unique Visits" value={3375} average={2731} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Top 5 Referrals</div>
												<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithTotal label="Typed/Bookmarked" value={2303} total={2303} />
											<BarWithTotal label="facebook.com" value={293} total={2303} />
											<BarWithTotal label="yahoo.com" value={186} total={2303} />
											<BarWithTotal label="news.google.com" value={163} total={2303} />
											<BarWithTotal label="google.com" value={125} total={2303} />
										</div>
										<div className="chart-section">
									    <div className="chart-section-header">
									      <div className="chart-left-header">Unique Visits per device</div>
												<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
									      <div className="chart-left-header"></div>
									    </div>
									    <BarWithTotal label="Desktop" value={2643} total={2643} />
											<BarWithTotal label="Mobile" value={1961} total={2643} />
											<BarWithTotal label="Tablet" value={947} total={2643} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
						</div>
					)
					:
						null
					}

					{
						selectedDataset === 2 ? (
							<div className="stat-list-section">
								<Accordion>
								<AccordionItem title="After living on $60 a week for 5 weeks here's my No. 1 money-saving tip" visits="3962" shares="357216" likes="3673">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={3861} average={1717} />
											<BarWithAverage label="Number of Page Views" value={3962} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={3673} average={1583} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Lifetime</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={338806} average={29025} />
											<BarWithAverage label="Number of Page Views" value={357782} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={335214} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Top 5 Referrals</div>
												<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithTotal label="yahoo.com" value={117074} total={177074} />
											<BarWithTotal label="Typed/Bookmarked" value={106764} total={177074} />
											<BarWithTotal label="facebook.com" value={4356} total={177074} />
											<BarWithTotal label="m.facebook.com" value={1424} total={177074} />
											<BarWithTotal label="my.xfinity.com" value={957} total={177074} />
										</div>
										<div className="chart-section">
									    <div className="chart-section-header">
									      <div className="chart-left-header">Unique Visits per device</div>
												<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
									      <div className="chart-left-header"></div>
									    </div>
									    <BarWithTotal label="Desktop" value={297724} total={297724} />
											<BarWithTotal label="Mobile" value={11704} total={297724} />
											<BarWithTotal label="Tablet" value={34872} total={297724} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Amazon sinks as revenue misses, guidance disappoints" visits="2561" shares="281540" likes="2368">
					        	<div className="stat-item">
		          	<div className="stat-chart">
									<div className="chart-container">
										<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Today</div>
												<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={2426} average={1717} />
											<BarWithAverage label="Number of Page Views" value={2561} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={2368} average={1583} />
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
											<BarWithTotal label="Mobile" value={21701} total={297724} />
											<BarWithTotal label="Tablet" value={34872} total={297724} />
									  </div>
									</div>
          			</div>
       			</div>
					</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Suzy Welch: 4 signs you should quit your job immediately" visits="3725" shares="200108" likes="2840">
					        <div className="stat-item">
					          <div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={3526} average={1717} />
											<BarWithAverage label="Number of Page Views" value={3725} average={2116} />
											<BarWithAverage label="Number of Unique Visits" value={2840} average={1583} />
											<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Month</div>
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
													<BarWithTotal label="android-app://com.linkedin.android" value={21277} total={69380} />
													<BarWithTotal label="facebook.com" value={1250} total={69380} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={197724} total={197724} />
											<BarWithTotal label="Mobile" value={36701} total={197724} />
											<BarWithTotal label="Tablet" value={54822} total={197724} />
											  </div>
											</div>
					          </div>
					        </div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Gaga made $0 from her Super Bowl LI performance" visits="2692" shares="157069" likes="2416">
					        	<div className="stat-item">
					          		<div className="stat-chart">
											<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Article Statistics</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Visits" value={2547} average={1717} />
														<BarWithAverage label="Number of Page Views" value={2692} average={2116} />
														<BarWithAverage label="Number of Unique Visits" value={2416} average={1583} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Month</div>
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
												    <BarWithTotal label="Desktop" value={192524} total={192524} />
												<BarWithTotal label="Mobile" value={31701} total={192524} />
												<BarWithTotal label="Tablet" value={54872} total={192524} />
												  </div>
												</div>
											</div>
										</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="A couple who spent $30,000 eating out last year highlight a critical money lesson" visits="2932" shares="148528" likes="2753">
				        	<div className="stat-item">
				          	<div className="stat-chart">
											<div className="chart-container">
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Article Statistics</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithAverage label="Number of Visits" value={2853} average={1717} />
													<BarWithAverage label="Number of Page Views" value={2932} average={2116} />
													<BarWithAverage label="Number of Unique Visits" value={2753} average={1583} />
													<div className="average-text">CNBC.com Average</div>
												</div>
												<div className="chart-section">
											<div className="chart-section-header">
												<div className="chart-left-header">Article Statistics: Month</div>
												<a className="chart-link" href="https://my.omniture.com/login">Omniture</a>
												<div className="chart-left-header"></div>
											</div>
											<BarWithAverage label="Number of Visits" value={140716} average={29025} />
											<BarWithAverage label="Number of Page Views" value={148528} average={33106} />
											<BarWithAverage label="Number of Unique Visits" value={138326} average={22732} />
											<div className="average-text">CNBC.com Average</div>
										</div>
												<div className="chart-section">
													<div className="chart-section-header">
														<div className="chart-left-header">Top 5 Referrals</div>
														<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
														<div className="chart-left-header"></div>
													</div>
													<BarWithTotal label="yahoo.com" value={73065} total={73065} />
													<BarWithTotal label="Typed/Bookmarked" value={58660} total={73065} />
													<BarWithTotal label="finance.yahoo.com" value={2593} total={73065} />
													<BarWithTotal label="facebook.com" value={524} total={73065} />
													<BarWithTotal label="my.xfinity.com/cid=cust" value={497} total={73065} />
												</div>
											  <div className="chart-section">
											    <div className="chart-section-header">
											      <div className="chart-left-header">Visits per device</div>
														<a className="chart-link" href="https://my.omniture.com/login/">Omniture</a>
											      <div className="chart-left-header"></div>
											    </div>
											    <BarWithTotal label="Desktop" value={88985} total={88985} />
													<BarWithTotal label="Mobile" value={53261} total={88985} />
													<BarWithTotal label="Tablet" value={68214} total={88985} />
											  </div>
											</div>
										</div>
				          </div>
								</AccordionItem>
							</Accordion>
							</div>
						)
						:
						null
					}
						
						
					</div>
				</div>
		)
	}
}
