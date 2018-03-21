import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import $ from "jquery";
import { Accordion, AccordionItem } from './Accordion';
import { BarWithAverage, BarWithTotal } from './stats/BarWithAverage';
import TextSwitch from "./form/TextSwitch";



const DATASET_OPTIONS = [
	"Video Starts Today",
	"Video Starts Life",
	"Video Completion Life"
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
						<div className="yesterday stat-list-section">
							<Accordion>
								<AccordionItem 
									title="How one business made $345,000 in 2 months beating a viral Kickstarter product to market" 
									visits="21542" 
									shares="63.72%" 
									likes="44612" 
									type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={21542} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={15421} average={3142} />
														<BarWithAverage label="% of Video Complete" value={71.58} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={44612} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={28431} average={7349} />
														<BarWithAverage label="% of Video Complete" value={63.72} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="drudgereport.com" value={21426} total={21426} />
														<BarWithTotal label="Typed/Bookmarked" value={9301} total={21426} />
														<BarWithTotal label="news.google.com" value={5243} total={21426} />
														<BarWithTotal label="google.com" value={2941} total={21426} />
														<BarWithTotal label="google.ca" value={881} total={21426} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
							<AccordionItem title="Apple analyst: Watch and AirPods aren't selling at all" visits="16771" shares="62.79%" likes="37842" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={16771} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={10532} average={3142} />
														<BarWithAverage label="% of Video Complete" value={64.15} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={37842} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={21425} average={7349} />
														<BarWithAverage label="% of Video Complete" value={62.79} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={21216} total={21216} />
														<BarWithTotal label="facebook.com" value={9301} total={21216} />
														<BarWithTotal label="news.google.com" value={5243} total={21216} />
														<BarWithTotal label="google.com" value={2941} total={21216} />
														<BarWithTotal label="google.ca" value={881} total={21216} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
							<AccordionItem title="Uber faces heat for operating during taxi strike" visits="14753" shares="51.26%" likes="57822" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={14753} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={7642} average={3142} />
														<BarWithAverage label="% of Video Complete" value={51.80} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={57822} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={29642} average={7349} />
														<BarWithAverage label="% of Video Complete" value={51.26} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={23062} total={23062} />
														<BarWithTotal label="facebook.com" value={19301} total={23062} />
														<BarWithTotal label="news.google.com" value={7243} total={23062} />
														<BarWithTotal label="yahoo.com" value={5941} total={23062} />
														<BarWithTotal label="google.ca" value={2881} total={23062} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
							<AccordionItem title="Trump AG nominee Sessions once asked Yates if she should say 'no' to the president" visits="14405" shares="46.52%" likes="22831" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={14405} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={7064} average={3142} />
														<BarWithAverage label="% of Video Complete" value={49.03} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: Off</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={22831} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={10621} average={7349} />
														<BarWithAverage label="% of Video Complete" value={46.52} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={19532} total={19532} />
														<BarWithTotal label="facebook.com" value={10432} total={19532} />
														<BarWithTotal label="news.google.com" value={8952} total={19532} />
														<BarWithTotal label="yahoo.com" value={4941} total={19532} />
														<BarWithTotal label="google.ca" value={3881} total={19532} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
							<AccordionItem title="Apple analyst: Watch and AirPods aren't selling at all" visits="13632" shares="49.60%" likes="38426" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Yesterday</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={13632} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={6952} average={3142} />
														<BarWithAverage label="% of Video Complete" value={50.99} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: Off</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={38426} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={19059} average={7349} />
														<BarWithAverage label="% of Video Complete" value={49.60} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={17231} total={17231} />
														<BarWithTotal label="facebook.com" value={11432} total={17231} />
														<BarWithTotal label="google.com" value={6952} total={17231} />
														<BarWithTotal label="yahoo.com" value={5941} total={17231} />
														<BarWithTotal label="news.google.com" value={1953} total={17231} />
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
								<AccordionItem title="President Trump's National Security Advisor Michael Flynn resigns" visits="39523" shares="78.04%" likes="39523" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={39523} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={30843} average={3142} />
														<BarWithAverage label="% of Video Complete" value={78.04} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={39523} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={30843} average={7349} />
														<BarWithAverage label="% of Video Complete" value={78.04} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={17231} total={17231} />
														<BarWithTotal label="facebook.com" value={11432} total={17231} />
														<BarWithTotal label="google.com" value={6952} total={17231} />
														<BarWithTotal label="yahoo.com" value={5941} total={17231} />
														<BarWithTotal label="news.google.com" value={1953} total={17231} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
								<Accordion>
								<AccordionItem title="Serial house sitting is the new fad for retirees" visits="19321" shares="77.30%" likes="19321" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={19321} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={14935} average={3142} />
														<BarWithAverage label="% of Video Complete" value={77.30} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={57822} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={29642} average={7349} />
														<BarWithAverage label="% of Video Complete" value={51.264} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={7823} total={7823} />
														<BarWithTotal label="facebook.com" value={8432} total={7823} />
														<BarWithTotal label="google.com" value={4952} total={7823} />
														<BarWithTotal label="yahoo.com" value={2941} total={7823} />
														<BarWithTotal label="news.google.com" value={953} total={7823} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Wall Street set to extend win streak" visits="9872" shares="75.31%" likes="47382" type="VIDEO_START">
					        <div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={9782} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={7204} average={3142} />
														<BarWithAverage label="% of Video Complete" value={73.64} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={47382} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={36022} average={7349} />
														<BarWithAverage label="% of Video Complete" value={75.31} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={17231} total={17231} />
														<BarWithTotal label="facebook.com" value={11432} total={17231} />
														<BarWithTotal label="google.com" value={6952} total={17231} />
														<BarWithTotal label="news.google.com" value={5941} total={17231} />
														<BarWithTotal label="yahoo.com" value={1953} total={17231} />
													</div>
												</div>
			          			</div>			
			       			</div>
								</AccordionItem>
							</Accordion>
							
							<Accordion>
								<AccordionItem title="Savvy socializing: How to have fun on a budget" visits="9114" shares="74.78%" likes="34150" type="VIDEO_START">
				        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={9114} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={5234} average={3142} />
														<BarWithAverage label="% of Video Complete" value={57.43} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={34150} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={25435} average={7349} />
														<BarWithAverage label="% of Video Complete" value={74.48} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={17231} total={17231} />
														<BarWithTotal label="facebook.com" value={11432} total={17231} />
														<BarWithTotal label="google.com" value={6952} total={17231} />
														<BarWithTotal label="news.google.com" value={5941} total={17231} />
														<BarWithTotal label="yahoo.com" value={1953} total={17231} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Cramer Remix: Why Apple s proof worries about Trump are overblown" visits="11417" shares="73.52%" likes="28224" type="VIDEO_START">
				        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={11417} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={8325} average={3142} />
														<BarWithAverage label="% of Video Complete" value={72.92} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={28224} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={20750} average={7349} />
														<BarWithAverage label="% of Video Complete" value={73.52} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={7231} total={7231} />
														<BarWithTotal label="facebook.com" value={4923} total={7231} />
														<BarWithTotal label="google.com" value={2042} total={7231} />
														<BarWithTotal label="news.google.com" value={1032} total={7231} />
														<BarWithTotal label="yahoo.com" value={793} total={7231} />
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
						<div className="today stat-list-section">
							<Accordion>
							<AccordionItem title="President Trump's National Security Advisor Michael Flynn resigns" visits="14753" shares="51.26%" likes="157822" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={14753} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={7642} average={3142} />
														<BarWithAverage label="% of Video Complete" value={51.80} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={157822} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={79642} average={7349} />
														<BarWithAverage label="% of Video Complete" value={51.26} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={23062} total={23062} />
														<BarWithTotal label="facebook.com" value={19301} total={23062} />
														<BarWithTotal label="news.google.com" value={7243} total={23062} />
														<BarWithTotal label="yahoo.com" value={5941} total={23062} />
														<BarWithTotal label="google.ca" value={2881} total={23062} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem 
									title="This $25 million Miami mansion was once owned by rocker Lenny Kravitz" 
									visits="21542" 
									shares="63.72%" 
									likes="144612" 
									type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={21542} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={15421} average={3142} />
														<BarWithAverage label="% of Video Complete" value={71.58} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={144612} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={78431} average={7349} />
														<BarWithAverage label="% of Video Complete" value={63.72} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
							<AccordionItem title="The ranks of unemployed young veterans are rising. Here's why" visits="16771" shares="56.04%" likes="137842" type="VIDEO_START">
					        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={116771} average={7216} />
														<BarWithAverage label="Number of Video Complete" value={79423} average={3142} />
														<BarWithAverage label="% of Video Complete" value={62.79} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={37842} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={19425} average={7349} />
														<BarWithAverage label="% of Video Complete" value={56.04} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={21216} total={21216} />
														<BarWithTotal label="facebook.com" value={9301} total={21216} />
														<BarWithTotal label="news.google.com" value={5243} total={21216} />
														<BarWithTotal label="google.com" value={2941} total={21216} />
														<BarWithTotal label="google.ca" value={881} total={21216} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Dow, S&P, Nasdaq set all-time intraday highs" visits="8114" shares="67.68%" likes="134150" type="VIDEO_START">
				        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Today</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={8114} average={5216} />
														<BarWithAverage label="Number of Video Complete" value={5062} average={3142} />
														<BarWithAverage label="% of Video Complete" value={67.85} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: Off</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={134150} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={83264} average={7349} />
														<BarWithAverage label="% of Video Complete" value={67.68} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={21216} total={21216} />
														<BarWithTotal label="finance.yahoo.com" value={9301} total={21216} />
														<BarWithTotal label="news.google.com" value={5243} total={21216} />
														<BarWithTotal label="google.com" value={2941} total={21216} />
														<BarWithTotal label="google.ca" value={881} total={21216} />
													</div>
												</div>
			          			</div>
			       			</div>
								</AccordionItem>
							</Accordion>
							<Accordion>
								<AccordionItem title="Munster: Keep betting on Apple" visits="6425" shares="57.22%" likes="128224" type="VIDEO_START">
				        	<div className="stat-item">
					          	<div className="stat-chart">
												<div className="chart-container">
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Yesterday</div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={6425} average={5216} />
														<BarWithAverage label="Number of Video Complete" value={3864} average={3142} />
														<BarWithAverage label="% of Video Complete" value={58.92} average={30.542} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Video Statistics: Lifetime <span className="autoplay-label">Autoplay: On</span></div>
															<a className="chart-link" href="https://my.omniture.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithAverage label="Number of Video Starts" value={128224} average={17521} />
														<BarWithAverage label="Number of Video Complete" value={66963} average={7349} />
														<BarWithAverage label="% of Video Complete" value={57.22} average={29.502} />
														<div className="average-text">CNBC.com Average</div>
													</div>
													<div className="chart-section">
														<div className="chart-section-header">
															<div className="chart-left-header">Top 5 Traffic Sources</div>
															<a className="chart-link" href="https://chartbeat.com/">Omniture</a>
															<div className="chart-left-header"></div>
														</div>
														<BarWithTotal label="Typed/Bookmarked" value={21216} total={21216} />
														<BarWithTotal label="facebook.com" value={9301} total={21216} />
														<BarWithTotal label="google.com" value={5243} total={21216} />
														<BarWithTotal label="google.co.uk" value={2941} total={21216} />
														<BarWithTotal label="techcrunch.com" value={881} total={21216} />
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
