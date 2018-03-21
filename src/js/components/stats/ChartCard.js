import React, { Component, PropTypes } from 'react';
import BarChart from './BarChart';
import Selectbox from '../form/Selectbox';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




const graphs = [];



/************* Visits *************/

graphs[0] = {
	title: "Total number of visits",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [4916346, 5030461, 4631950, 2617064, 2636640, 5505843, 5989708]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}		
	}
}



/************* Page views *************/

graphs[1] = {
	title: "Total number of page views",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [16561089, 16725960, 14084224, 5412483, 6081121, 16851718, 18013375]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}		
	}
}




/************* Unique visitors *************/

graphs[2] = {
	title: "Total number of unique visitors",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(3, 169, 244,1)",
	      pointColor: "rgba(3, 169, 244,1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2884688, 3016395, 2949235, 2159297, 1955292, 3408055, 3774220]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}



/************* MTD UV *************/

graphs[3] = {
	title: "Month-to-Date unique visitors",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(3, 169, 244,1)",
	      pointColor: "rgba(3, 169, 244,1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [32698795, 32124119, 35535034, 36745818, 37811520, 39549436, 41509336]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}



/************* Video viewers *************/

graphs[4] = {
	title: "Video viewers",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(3, 169, 244,1)",
	      pointColor: "rgba(3, 169, 244,1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [454929, 477851, 446195, 255272, 152077, 556591, 605417]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}


/************* Video starts *************/

graphs[5] = {
	title: "Video starts",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(3, 169, 244,1)",
	      pointColor: "rgba(3, 169, 244,1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [1039965, 1045278, 912238, 472214, 297552, 1223787, 1259458]
	  }
	],
	labels: ["Feb 7", "Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12", "Feb 13"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}


/************* Section monthly trending *************/

graphs[6] = {
	title: "Section monthly unique visitors trending",
	datasets: [
	   {
	      label: "Politics",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2105248, 3898926, 6726938, 4137428, 4548649, 8730597, 6790263, 7106664, 7119703, 9471936, 12415969, 7391107, 9763984]

	  },
	  {
	      label: "Make It",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [null, null, 1051168, 1753422, 1932937, 1692149, 2325287, 2483742, 3453734, 2608309, 3267543, 5315046, 5623443]

	  },
	  {
	      label: "Technology",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2212781, 3083626, 2860651, 2732775, 3353010, 3126602, 3089944, 2990091, 4046754, 4110976, 3882984, 3881405, 4960115]

	  },
	  {
	      label: "Homepage",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(139, 195, 74, 1)",
	      pointColor: "rgba(139, 195, 74, 1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [5148264, 6242322, 5910780, 5401759, 5160262, 5709801, 5382116, 5232470, 4866830, 4647642, 5514803, 4920008, 5268550]
	  },
	  {
	      label: "Markets",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [5582902, 5328831, 4318528, 5026045, 4287407, 5995405, 4264489, 4302384, 4182716, 3612176, 7238028, 4704625, 4591064]

	  }, 
	  {
	      label: "Economy",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [3582316, 3157404, 3304882, 2638633, 2618075, 3818968, 3844772, 2196536, 2889585, 2231446, 2302728, 3523088, 5854185]

	  },
	  {
	      label: "Video & TV",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2913214, 2697378, 2368859, 2484591, 2831829, 2531578, 3335968, 2426572, 2457804, 2422859, 2705383, 2752030, 3071750]

	  },
	  {
	      label: "Consumer",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2490268, 2424561, 2397530, 2676195, 2368749, 2323683, 3471467, 2719152, 1890679, 2385067, 2680072, 3613550, 4356842]

	  },
	  
	 
	  {
	      label: "Securities",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2444109, 2172704, 1741584, 1611735, 1489254, 1638246, 1598779, 1484820, 1349227, 1333033, 1774807, 1718941, 1817254]

	  },
	  {
	      label: "Business",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [1839268, 1858775, 1772248, 1644521, 1549296, 849252, 1720266, 1214461, 1287988, 1690802, 1323660, 1100024, 1653061]

	  },
	  {
	      label: "Life",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [2692105, 1740558, 1802401, 1712905, 1912142, 1816314, 2868618, 2134049, 1370154, 1451054, 1540555, 1345952, 1797881]

	  },
	  {
	      label: "Personal Finance",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [996627, 1122373, 1030442, 1116312, 1445437, 1173500, 1698204, 1063824, 876490, 921122, 832675, 2268832, 2199646]

	  },
	  {
	      label: "Finance",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [3155161, 3711846, 2684977, 2965299, 2620452, 2288388, 2461104, 2329662, 2895190, 2812353, 2514128, 2856076, 3053046]

	  },
	  {
	      label: "Wealth",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [1278411, 1145764, 1002527, 1177311, 1309360, 1054780, 1230797, 1032632, 799239, 841015, 1316583, 1113589, 963514]

	  },
	  {
	      label: "Energy",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [1692359, 1618157, 1011626, 1110334, 1047415, 868907, 760936, 774596, 744938, 792520, 1077744, 1781440, 982145]

	  },
	  {
	      label: "Health Care",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [661364, 844763, 587716, 670762, 756725, 1139986, 1125615, 1402486, 739013, 530128, 464863, 1032928, 1407797]

	  },
	  {
	      label: "Real Estate",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [488293, 572125, 762876, 626195, 775901, 634820, 601170, 553309, 545160, 437486, 549231, 598051, 559051]

	  },
	  
	  {
	      label: "Commentary",
	      fillColor: "rgba(0, 0, 0,0.0)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [1941360, 1348292, 1949544, 2075465, 2364653, 3766496, 2766079, 2313777, 2518351, 1859256, 2466075, 1985355, 2644454]

	  }
	],
	labels: ["Jan 16", "Feb 16", "Mar 16", "Apr 16", "May 16", "Jun 16", "Jul 16", "Aug 16", "Sep 16", "Oct 16", "Nov 16", "Dec 16", "Jan 17"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}

/************* Monthly Unique Visits Trending *************/

graphs[7] = {
	title: "Monthly unique visitors trending",
	datasets: [
	  {
	      label: "Dataset1",
	      fillColor: "rgba(3, 169, 244,0.0)",
	      strokeColor: "rgba(3, 169, 244,1)",
	      pointColor: "rgba(3, 169, 244,1)",
	      pointStrokeColor: "#fff",
	      pointHighlightFill: "#fff",
	      pointHighlightStroke: "rgba(220,220,220,1)",
	      data: [15253261, 13732054, 13732943, 13032954, 15030542, 15849235, 13138523, 13229432, 14440201, 16629503, 19402343, 16038594, 15038502]
	  }
	],
	labels: ["Jan 16", "Feb 16", "Mar 16", "Apr 16", "May 16", "Jun 16", "Jul 16", "Aug 16", "Sep 16", "Oct 16", "Nov 16", "Dec 16", "Jan 17"],
	options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 20,
			text: "Graph title"
		}
	}
}

export default class chartCard extends Component {

	static defaultProps = {
		graphs: graphs
	}


	constructor(props) {
		super(props);

		this.state = {
			currGraphIndex: 0
		}
	}

	onSelect = (val) => {
		this.setState({
			currGraphIndex: val.id
		});
	}


	render () {

		const currGraphIndex = this.state.currGraphIndex;
		const graph = this.props.graphs[currGraphIndex];
		const selectboxItems = this.props.graphs.map((graph, index) => {
			return {
				id: index,
				title: graph.title,
				value: index
			}
		});


		return (
			<div className="chart-card">
        <div className="stat-item">
					<div className="stat-copy">
						<div className="stat-info">
								<div className="stat-title">
									<Selectbox
										items={selectboxItems}
										value={selectboxItems[currGraphIndex]}
										onChange={this.onSelect}
										label="Choose graph" 
										inputPlaceholder="Choose a graph to display"
										disableNone={true}
									/>
								</div>
								<div className="stat-source">Omniture</div>
						</div>
						<div className="stat-links">
							<a href="https://my.omniture.com/" target="_blank">
									<i className="iconcss icon-link-out" />
							</a>
						</div>
					</div>
          <div className="stat-chart">
          	<div className="stat-chart__inner">
	          	<ReactCSSTransitionGroup transitionName="bar-chart" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
		          	<BarChart 
									title={graph.title}
									key={currGraphIndex} 
									datasets={graph.datasets} 
									chartOptions={graph.options} 
									labels={graph.labels} 
								/>
							</ReactCSSTransitionGroup>
						</div>
          </div>
        </div>
			</div>
		)
	}
}