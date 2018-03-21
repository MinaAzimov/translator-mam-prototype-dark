import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export class BarWithAverage extends Component {

	render() {

		let percent = (this.props.value/this.props.average - 1) * 100;
		let leftWidth = (percent < 0) ? 100 + percent : 100;
		let rightWidth = Math.min(((percent >= 0) ? percent : 0),100);
		let classnames = classNames({
			'chart-item-row': true,
			'chart-item-row--total': this.props.isTotal,
		})

		let formattedValue = this.props.value.toLocaleString();

		return (
			<div className={classnames}>
				<div className="chart-item-title">{this.props.label}</div>
				<div className="chart-data-container">
					<div className="chart-data-item-container">
						<div className="chart-data-item">
							<div className="chart-left-data" style={{width: leftWidth + "%"}}></div>
						</div>
					</div>
					<div className="chart-data-item-container">
						<div className="chart-data-item">
							<div className="chart-right-data" style={{width: rightWidth + "%"}}></div>
						</div>
					</div>
				</div>
				<div className="chart-item-value">{formattedValue}</div>
			</div>
		)
	}

}


export class BarWithTotal extends Component {

	render() {

		let percent = (this.props.value/this.props.total) * 100;
		let formattedValue = this.props.value.toLocaleString();
		return (	
			<div className="chart-item-row">
				<div className="chart-item-title">{this.props.label}</div>
				<div className="single-chart-item">
					<div className="chart-data-item-container">
						<div className="chart-data-item">
							<div className="chart-right-data" style={{width: percent + "%"}}></div>
						</div>
					</div>
				</div>
				<div className="chart-item-value">{formattedValue}</div>
			</div>
		)
	}

}
