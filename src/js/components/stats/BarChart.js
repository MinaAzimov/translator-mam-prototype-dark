import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Line } from "react-chartjs";
import Switch from "../form/Switch";

import Select from 'react-select';

const emptyDataset = {
  label: "Graph1",
  fillColor: "rgba(3, 169, 244,0.0)",
  strokeColor: "rgba(3, 169, 244,1)",
  pointColor: "rgba(3, 169, 244,1)",
  pointStrokeColor: "#fff",
  pointHighlightFill: "#fff",
  pointHighlightStroke: "rgba(220,220,220,1)",
  data: []
}




class BarChart extends Component {


	static propTypes = {
		datasets: PropTypes.array,
		chartOptions: PropTypes.object,
		labels: PropTypes.array,
		title: PropTypes.string,
		colors: PropTypes.array
	}

	static defaultProps = {
		colors: [
			"#03a9f4",
			"#ff6700",
			"#3cad30",
			"#dc3e3e",
			"#994ad2",
			"#3f51b5",
			"#e91363",
			"#00bcd4",
			"#8bc34a",
			"#cddc39",
			"#ffc107",
			"#795548"
		]
	}

	constructor(props) {
		super(props);

		this.state = {
			activeDatasets: props.datasets.slice(0, 5)
		}
		this.renderIndex = 0;
	}

	toggleActive = (selectedItems) => {
		this.setState({
			activeDatasets: selectedItems.map((item)=>item.value)
		})
	}

	render() {

		const { chartOptions, labels, datasets, title, colors } = this.props;
		const numColors = colors.length;
		const { activeDatasets } = this.state;

		chartOptions.scaleLabel = (label) => {

			let v = label.value;

			if (v < 1000) {
				return v;
			}

			else if (v < 1000000) {
				return (v/1000).toFixed(2) + "K";
			}

			else {
				return (v/1000000).toFixed(2) + "M";
			}
		}

		activeDatasets.forEach((dataset, index) => {
			let mod = index%numColors;
			dataset.strokeColor = colors[mod];
			dataset.pointColor = colors[mod];
		})

		const chartData = {
			labels: labels,
			datasets: activeDatasets.length > 0 ? activeDatasets : emptyDataset
		}

		const datasetOptions = datasets.map((dataset, index) => {
			return {
				value: dataset,
				label: dataset.label,
			}
		})

		const datasetSelectValue = activeDatasets.map((dataset, index) => {
			return {
				value: dataset,
				label: dataset.label,
				className: "dataset-select-tag--" + (index%numColors)
			}
		})

		this.renderIndex++;

		return (
			<div className="bar-chart">
				{
					datasets.length > 1 ?
						<div className="bar-chart__toggles">
			        <Select
			          multi={true}
			          onChange={this.toggleActive}
			          options={datasetOptions}
			          value={datasetSelectValue}
			          disabled={false}
			          placeholder=""
			          inputProps={{placeholder: "Add datasets..."}}
			        />
						</div>
					:
						null
				}
				<Line key={this.renderIndex} data={chartData} options={chartOptions} width="800" height="450"/>
			</div>
		)
	}
}

export default BarChart;