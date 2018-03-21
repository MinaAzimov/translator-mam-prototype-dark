
import React, { Component, PropTypes } from 'react';
import SlideDown from './SlideDown'
import classNames from 'classnames';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


const tooltip = function(text) {
	return <Tooltip id="tooltip">{text}</Tooltip>;
}


class Accordion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			openIndex: null
		}
	}

	toggleOpen = (index) => {
		const openIndex = this.state.openIndex;
		if (openIndex === index) {
			this.setState({
				openIndex: null
			})
		}
		else {
			this.setState({
				openIndex: index
			})
		}
	}

	render() {
		let items = React.Children.map(this.props.children, (child,index)=>{
			return React.cloneElement(child, {
				toggleOpen: this.toggleOpen,
       	index: index,
       	key: index,
       	isOpen: this.state.openIndex === index
     	})
		})

		return (
			<div className="accordion">
				{items}
			</div>
		)
	}
}

class AccordionItem extends Component {


	static defaultProps = {
		type: "PAGE_VIEWS"
	}


	constructor(props) {
		super(props);
		this.state = {
			removed: false
		}
	}

	remove = () => {
		this.setState({
			removed: true
		})
	}

	toggleOpen = (e) => {
		e.stopPropagation();
		this.props.toggleOpen(this.props.index);
	}

	render() {

		const { type } = this.props;

		const classnames = classNames({
			'accordion-item': 'true',
			'accordion-item--open': this.props.isOpen,
			'accordion-item--removed': this.state.removed
		})

		let statSummaryLabels;

		switch (type) {
			case "PAGE_VIEWS":
				statSummaryLabels = [
					{
						abbrv: "PV-Today",
						title: "Page Views today"
					},
					{
						abbrv: "UV-Today",
						title: "Unique Visitors today"
					},
					{
						abbrv: "UV-Life",
						title: "Unique Visitors lifetime"
					}
				];
				break;
			case "VIDEO_START":
				statSummaryLabels = [
					{
						abbrv: "VS-Today",
						title: "Video Starts today"
					},
					{
						abbrv: "VS-Life",
						title: "Video Starts lifetime"
					},
					{
						abbrv: "VC-Life",
						title: "Video Completion lifetime"
					}
				];
				break;
		}

		console.log("Tje say summary labels", this.props, statSummaryLabels);

		return (
			<div className={classnames}>
				<div className="accordion-copy" onClick={this.toggleOpen}>
					<div className="accordion-item__title">
						{this.props.title}
					</div>
					<div className="accordion-stat-summary">
						<OverlayTrigger placement="bottom" overlay={tooltip(statSummaryLabels[0].title)}>
							<div className="stat-summary-item">
								<div className="stat-summary-item__number">{parseInt(this.props.visits).toLocaleString()}</div>
								<div className="stat-summary-item__label">{statSummaryLabels[0].abbrv}</div>
							</div>
						</OverlayTrigger>
						<OverlayTrigger placement="bottom" overlay={tooltip(statSummaryLabels[1].title)}>
							<div className="stat-summary-item likes">
								<div className="stat-summary-item__number">{parseInt(this.props.likes).toLocaleString()}</div>
								<div className="stat-summary-item__label">{statSummaryLabels[1].abbrv}</div>
							</div>
						</OverlayTrigger>
						<OverlayTrigger placement="bottom" overlay={tooltip(statSummaryLabels[2].title)}>
						<div className="stat-summary-item shares">
							<div className="stat-summary-item__number">
							{
								type==="VIDEO_START" ? this.props.shares
									: parseInt(this.props.shares).toLocaleString()
							}
							</div>
							<div className="stat-summary-item__label">{statSummaryLabels[2].abbrv}</div>
						</div>
						</OverlayTrigger>
					</div>
					<i className="iconcss icon-line-arrow-up"></i>
					{
						this.props.allowRemove ?
							<div className="accordion-item__remove" onClick={this.remove}>
								<i className="iconcss icon-close"></i>
							</div>	
						:
							null					
					}
				</div>
				<SlideDown isOpen={this.props.isOpen} duration={500} classPrefix="accordion-slide">
					<div className="accordion-item__main">
						{this.props.children}
					</div>
				</SlideDown>
			</div>
		)
	}
}

export { Accordion, AccordionItem }
