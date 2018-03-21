import React, { Component, PropTypes } from 'react';
import { BarWithTotal } from './BarWithAverage';
import classNames from 'classnames';
import Text from "../form/Text";
import Selectbox from "../form/Selectbox";
import TextSwitch from "../form/TextSwitch";
import $ from "jquery";
import { debounce } from 'lodash';
import Scroller from '../Scroller';

const todayStats = [
	{
		name: "Kathleen Elkins",
		pageview: 9791
	},
	{
		name: "Jacob Pramuk",
		pageview: 4210
	},
	{
		name: "Marguerite Ward",
		pageview: 5208
	},
	{
		name: "Ari Levy",
		pageview: 1079
	},
	{
		name: "Matthew J. Belv",
		pageview: 2892
	},
	{
		name: "Anita Balakrishnan",
		pageview: 4529
	},
	{
		name: "Jeff Cox",
		pageview: 4227
	},
	{
		name: "Berkeley Lovela",
		pageview: 6421 
	},
	{
		name: "Jeff Daniels",
		pageview: 20797
	},
	{
		name: "Tom DiChristoph",
		pageview: 1493
	},
	{
		name: "Rebecca Ungarin",
		pageview: 4100
	},
	{
		name: "Fred Imbert",
		pageview: 1980
	},
	{
		name: "Diana Olick",
		pageview: 7237
	},
	{
		name: "Abigail Stevens",
		pageview: 11316
	},
	{
		name: "Mike Juang",
		pageview: 1869
	},
	{
		name: "Cat Clifford",
		pageview: 4587
	},
	{
		name: "Patti Domm",
		pageview: 2476
	},
	{
		name: "Michelle Castil",
		pageview: 691
	},
	{
		name: "Tae Kim",
		pageview: 2257
	},
	{
		name: "Elizabeth Gurdu",
		pageview: 1124
	},
	{
		name: "Dan Mangan",
		pageview: 6291
	},
	{
		name: "Harriet Taylor",
		pageview: 742
	},			
	{
		name: "Matt Rosoff",
		pageview: 122
	},		
	{
		name: "Nyshka Chandram",
		pageview: 1022
	},		
	{
		name: "Ylan Mui",
		pageview: 4327
	},		
	{
		name: "Krystina Gustaf",
		pageview: 2131
	},		
	{
		name: "Jake Novak",
		pageview: 4022
	},		
	{
		name: "Sarah Whitten",
		pageview: 1902
	},		
	{
		name: "Tom Anderson",
		pageview: 1997
	},		
	{
		name: "Leslie Shaffer",
		pageview: 933
	},		
	{
		name: "Darla Mercado",
		pageview: 647
	},		
	{
		name: "Evelyn Cheng",
		pageview: 2261
	},		
	{
		name: "CNBC.com Staff",
		pageview: 2508
	},		
	{
		name: "Robert Ferris",
		pageview: 1099
	},		
	{
		name: "Christine Wang",
		pageview: 1244
	},		
	{
		name: "David Reid",
		pageview: 1599
	},		
	{
		name: "Jessica Dickler",
		pageview: 19272
	},		
	{
		name: "Silvia Amaro",
		pageview: 1018
	},		
	{
		name: "Michelle Fox",
		pageview: 7538
	},		
	{
		name: "Cheang Ming",
		pageview: 139
	},		
	{
		name: "Mack Hogan",
		pageview: 14351
	},		
	{
		name: "Zack Guzman",
		pageview: 431
	},		
	{
		name: "Natalia Wojcik",
		pageview: 1051
	},		
	{
		name: "Robert Frank",
		pageview: 1919
	},		
	{
		name: "Arjun Kharpal",
		pageview: 6498
	},		
	{
		name: "Karen Gilchrist",
		pageview: 1492
	},		
	{
		name: "Kelli B. Grant",
		pageview: 1939
	},		
	{
		name: "Andrew Ross Sor",
		pageview: 116
	},		
	{
		name: "Peter Schacknow",
		pageview: 171
	},		
	{
		name: "Rachel Cao",
		pageview: 7668
	},
	{
		name: "Jay Yarow",
		pageview: 120
	}		
]

const yesterdayStats = [
	{
		name: "Kathleen Elkins",
		visits: 701751,
		pageview: 916677
	},
	{
		name: "Jacob Pramuk",
		visits: 497806,
		pageview: 702584
	},
	{
		name: "Marguerite Ward",
		visits: 412938,
		pageview: 479110
	},
	{
		name: "Ari Levy",
		visits: 309329,
		pageview: 347878
	},
	{
		name: "Matthew J. Belv",
		visits: 287332,
		pageview: 360249
	},
	{
		name: "Anita Balakrishnan",
		visits: 283035,
		pageview: 340402
	},
	{
		name: "Jeff Cox",
		visits: 270644,
		pageview: 351871
	},
	{
		name: "Berkeley Lovela",
		visits: 264572,
		pageview: 336802
	},
	{
		name: "Jeff Daniels",
		visits: 249219,
		pageview: 285659
	},
	{
		name: "Tom DiChristoph",
		visits: 235363,
		pageview: 282400
	},
	{
		name: "Rebecca Ungarin",
		visits: 205940,
		pageview: 273073
	},
	{
		name: "Fred Imbert",
		visits: 200157,
		pageview: 255502
	},
	{
		name: "Diana Olick",
		visits: 183427,
		pageview: 237008
	},
	{
		name: "Abigail Stevens",
		visits: 180421,
		pageview: 284856
	},
	{
		name: "Mike Juang",
		visits: 176097,
		pageview: 191397
	},
	{
		name: "Cat Clifford",
		visits: 151886,
		pageview: 189812
	},
	{
		name: "Patti Domm",
		visits: 144219,
		pageview: 183371
	},
	{
		name: "Michelle Castil",
		visits: 142566,
		pageview: 158039
	},
	{
		name: "Tae Kim",
		visits: 122154,
		pageview: 149497
	},
	{
		name: "Elizabeth Gurdu",
		visits: 119272,
		pageview: 137830
	},
	{
		name: "Dan Mangan",
		visits: 117731,
		pageview: 144793
	},
	{
		name: "Harriet Taylor",
		visits: 114384,
		pageview: 130303
	},			
	{
		name: "Matt Rosoff",
		visits: 108264,
		pageview: 119105
	},		
	{
		name: "Nyshka Chandram",
		visits: 107804,
		pageview: 127446
	},		
	{
		name: "Ylan Mui",
		visits: 107521,
		pageview: 128292
	},		
	{
		name: "Krystina Gustaf",
		visits: 105009,
		pageview: 127796
	},		
	{
		name: "Jake Novak",
		visits: 101257,
		pageview: 115923
	},		
	{
		name: "Sarah Whitten",
		visits: 91532,
		pageview: 115686
	},		
	{
		name: "Tom Anderson",
		visits: 91427,
		pageview: 115923
	},		
	{
		name: "Leslie Shaffer",
		visits: 87119,
		pageview: 102351
	},		
	{
		name: "Darla Mercado",
		visits: 83192,
		pageview: 101196
	},		
	{
		name: "Evelyn Cheng",
		visits: 76821,
		pageview: 89583
	},		
	{
		name: "CNBC.com Staff",
		visits: 75706,
		pageview: 97041
	},		
	{
		name: "Robert Ferris",
		visits: 75380,
		pageview: 86920
	},		
	{
		name: "Christine Wang",
		visits: 74997,
		pageview: 85810
	},		
	{
		name: "David Reid",
		visits: 73963,
		pageview: 83522
	},		
	{
		name: "Jessica Dickler",
		visits: 71557,
		pageview: 87147
	},		
	{
		name: "Silvia Amaro",
		visits: 70455,
		pageview: 95397
	},		
	{
		name: "Michelle Fox",
		visits: 68415,
		pageview: 91763
	},		
	{
		name: "Cheang Ming",
		visits: 64756,
		pageview: 72356
	},		
	{
		name: "Mack Hogan",
		visits: 63960,
		pageview: 78506
	},		
	{
		name: "Zack Guzman",
		visits: 63524,
		pageview: 71324
	},		
	{
		name: "Natalia Wojcik",
		visits: 61582,
		pageview: 66559
	},		
	{
		name: "Robert Frank",
		visits: 60659,
		pageview: 72914
	},		
	{
		name: "Arjun Kharpal",
		visits: 59417,
		pageview: 83396
	},		
	{
		name: "Karen Gilchrist",
		visits: 58970,
		pageview: 69445
	},		
	{
		name: "Kelli B. Grant",
		visits: 58363,
		pageview: 74114
	},		
	{
		name: "Andrew Ross Sor",
		visits: 56210,
		pageview: 62614
	},		
	{
		name: "Peter Schacknow",
		visits: 55670,
		pageview: 113045
	},		
	{
		name: "Rachel Cao",
		visits: 53947,
		pageview: 62832
	},
	{
		name: "Jay Yarow",
		visits: 2504,
		pageview: 2962
	}								
]






const monthlyStats = [
	{
		name: "Anita Balakrishnan",
		visits: 2378202
	},
	{
		name: "Jacob Pramuk",
		visits: 2335699
	},
	{
		name: "Krystina Gustaf",
		visits: 2126040
	},
	{
		name: "Kathleen Elkins",
		visits: 2083738
	},
	{
		name: "Elizabeth Gurdu",
		visits: 1350192
	},
	{
		name: "Christine Wang",
		visits: 1303151
	},
	{
		name: "Iori Ioannou",
		visits: 1140693
	},
	{
		name: "Zack Guzman",
		visits: 1097562
	},
	{
		name: "Abigail Stevens",
		visits: 824976
	},
	{
		name: "Robert Ferris",
		visits: 659468
	},
	{
		name: "Tom DiChristoph",
		visits: 642085
	},
	{
		name: "Dan Mangan",
		visits: 591223
	},
	{
		name: "Fred Imbert",
		visits: 586242
	},
	{
		name: "Cat Clifford",
		visits: 531601
	},
	{
		name: "Evelyn Cheng",
		visits: 516387
	},
	{
		name: "Berkeley Lovela",
		visits: 508746
	},
	{
		name: "Morgan Brennan",
		visits: 374464
	},
	{
		name: "CNBC.com Staff",
		visits: 372262
	},
	{
		name: "Patti Domm",
		visits: 357214
	},
	{
		name: "John Schoen",
		visits: 1142086
	},
	{
		name: "Berkeley Lovela",
		visits: 1127654
	},
	{
		name: "Jake Novak",
		visits: 1057126
	},
	{
		name: "Jeff Cox",
		visits: 1013146
	},
	{
		name: "CNBC.com Staff",
		visits: 923567
	},
	{
		name: "Fred Imbert",
		visits: 892240
	},
	{
		name: "Javier E. David",
		visits: 856969
	},
	{
		name: "Christine Wang",
		visits: 850938
	},
	{
		name: "Elizabeth Gurdu",
		visits: 832603
	},
	{
		name: "Jessica Dickler",
		visits: 820160
	},
	{
		name: "Jay Yarow",
		visits: 803441
	},
	{
		name: "Cat Clifford",
		visits: 782342
	},
	{
		name: "Antonio Jose V",
		visits: 749819
	},
	{
		name: "Arjun Kharpal",
		visits: 728669
	},
	{
		name: "Silvia Amaro",
		visits: 706450
	},
	{
		name: "Tom Anderson",
		visits: 658393
	},
	{
		name: "Katie Little",
		visits: 644307
	},
	{
		name: "Evelyn Cheng",
		visits: 623153
	},
	{
		name: "Luke Graham",
		visits: 545332
	},
	{
		name: "Matt Rosoff",
		visits: 538471
	},
	{
		name: "Robert Ferris",
		visits: 536278
	},
	{
		name: "Michelle Fox",
		visits: 526001
	},
	{
		name: "Spriha Srivasta",
		visits: 506197
	},
	{
		name: "David Reid",
		visits: 495808
	},
	{
		name: "Robert Frank",
		visits: 491019
	},
	{
		name: "Jeff Daniels",
		visits: 464571
	},
	{
		name: "Rachel Cao",
		visits: 446628
	},
	{
		name: "Rebecca Ungarin",
		visits: 419889
	},
	{
		name: "Mike Juang",
		visits: 393227
	},
	{
		name: "Diana Olick",
		visits: 383691
	},
	{
		name: "Sarah Whitten",
		visits: 366774
	},
	{
		name: "Alex Rosenberg",
		visits: 360208
	},
	{
		name: "Nyshka Chandran",
		visits: 340565
	},
	{
		name: "Kelli B. Grant",
		visits: 337493
	},
	{
		name: "Matt Clinch",
		visits: 312346
	},
	{
		name: "Ari Levy",
		visits: 303220
	},
	{
		name: "Seema Mody",
		visits: 291274
	},
	{
		name: "Annie Pei",
		visits: 290751
	},
	{
		name: "Steve Liesman",
		visits: 287810
	},
	{
		name: "Leslie Shaffer",
		visits: 279291
	}
]


const SORT_OPTIONS = [
	"Highest to lowest",
	"Lowest to highest",
	"Alphabetical"
]

const DATASET_OPTIONS = [
	"Today",
	"Yesterday",
	"Month"
]

const STAT_OPTIONS = [
	{
		id: 0,
		title: "Unique Visits",
		key: "visits"
	},
	{
		id: 1,
		title: "Page Views",
		key: "pageview"
	}	

]

export default class EditorStatistics extends Component {

	static defaultProps = {
		datasets: [
			todayStats,
			yesterdayStats,
			monthlyStats
		]
	}

	constructor(props) {
		super(props);
		this.state = {
			nameFilter: "",
			selectedSort: 0,
			selectedDataset: 0,
			selectedStat: STAT_OPTIONS[1],
			scrollTop: 0
		}


		this.adjustScroll = debounce((el) => {
			this.setState({
				scrollTop: $(el).position().top
			});
		}, 200);
	}

	filter = (name) => {
		this.setState({
			nameFilter: name
		})
	}

	onSelectSort = (sort) => {
		this.setState({
			selectedSort: sort.id
		})
	}

	onSelectData = (index) => {
		
		let selectedStat = this.state.selectedStat;

		if (index === 0) {
			selectedStat = STAT_OPTIONS[1];
		}
		else if (index === 2) {
			selectedStat = STAT_OPTIONS[0];
		}

		this.setState({
			selectedDataset: index,
			selectedStat: selectedStat
		})
	}

	onSelectStat = (val) => {
		this.setState({
			selectedStat: STAT_OPTIONS[val]
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.nameFilter !== this.state.nameFilter) {
			let el = this.refs["first-shown"];
			if (el) {
				this.adjustScroll(el);
			}
		}
	}

	sortList(list) {
		let selectedStat = this.state.selectedStat;
		let key = selectedStat.key;
		switch (this.state.selectedSort) {
			case 0:
				return list.sort((a, b) => {
					return b[key] - a[key];
				});
			case 1:
				return list.sort((a, b) => {
					return a[key] - b[key];
				});
			case 2:
				return list.sort((a, b) => {
					if (a.name > b.name) {
						return 1;
					}
					else {
						return -1;
					}
				});
			default:
				return list;
		}
	}

	onScroll = (val) => {
		console.log("on scroll!", val);
	}

	render() {

		let { nameFilter, selectedSort, selectedDataset, selectedStat, scrollTop } = this.state;
		let { datasets } = this.props;
		let selectedStatIndex = selectedStat.id;

		console.log("the selected stat", selectedStat);

		let statKey = selectedStat.key;

		let statOptions = STAT_OPTIONS.slice();

		if (selectedDataset === 0) {
			statOptions = statOptions.slice(1);
			selectedStatIndex = 0;
		}
		else if (selectedDataset === 2) {
			statOptions = statOptions.slice(0, 1);
			selectedStatIndex = 0;
		}

		let selectedData = datasets[selectedDataset].slice();
		this.sortList(selectedData);

		let total = Math.max.apply(null, selectedData.map(user=>user[statKey]));
		let classnames = classNames({
			'editor-statistics': true,
			'editor-statistics--has-filter': nameFilter !== ""
		})

		let firstShown = false;
		let sortOptions = SORT_OPTIONS.map((item, index)=> {
			return {
				id: index,
				title: item
			}
		})

		let selectedStatOption = STAT_OPTIONS[selectedSort]

		return (
			<div className={classnames}>
				<div className="editor-statistics__top">
					<TextSwitch
						onChange={this.onSelectData}
						value={selectedDataset}
						options={DATASET_OPTIONS}
						label="Time period"
					/>
					<TextSwitch
						onChange={this.onSelectStat}
						label="Data type"
						value={selectedStatIndex}
						options={statOptions.map(i=>i.title)}
					/>
				</div>

				<div className="editor-statistics__inner">
					<div className="editor-statistics__header">
						<i className="fa fa-search"></i>
						<Text 
							value={nameFilter}
							onChange={this.filter}
							placeholder="Search name..."

						/>
						<Selectbox
							items={sortOptions}
							value={sortOptions[selectedSort]}
							onChange={this.onSelectSort}
							label="Sort" 
							disableNone={true}
							noneText="Any"
						/>
					</div>
						<Scroller height={300} onScroll={this.onScroll} scrollTo={scrollTop}>
							<div className="editor-statistics__list-inner">
							{ 
								selectedData.map((user, index)=> {
									let username = user.name.toLowerCase();
									let filterShow = nameFilter ? username.indexOf(nameFilter.toLowerCase()) !== -1 : true;
									let ref = filterShow && firstShown === false ? "first-shown" : null;
									let val = user[statKey] ? user[statKey] : 23;
									if (ref) {
										firstShown = true;
									}
									let classnames = classNames({
										'editor-statistics__item': true,
										'editor-statistics__item--hide': !filterShow
									})
									return (
										<div className={classnames} key={index} ref={ref}>
											<BarWithTotal label={user.name} value={val} total={total} />
										</div>
									)
								})
							}
							</div>
						</Scroller>
				</div>
			</div>
		)
	}

}



