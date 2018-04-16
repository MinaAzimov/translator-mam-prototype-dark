import React, { Component, PropTypes } from 'react';

import classNames from "classnames";
import { connect } from 'react-redux';



class ListHeader extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
			document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
			document.removeEventListener('mousedown', this.handleClickOutside);
	}

	render() {

		const classnames = classNames({
			"library__header": true,
		})

		return (
			<div className={classnames}>
				<div className="library__row library__row--header">
					<div className="library__cell library__cell--header library__cell--header--thumb">
						<span className="library__cell-header-text"></span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--title library__cell--sortable">
						<span className="library__cell-header-text">Title / Filename</span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--owner  library__cell--sortable">
						<span className="library__cell-header-text">Owner</span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--modified  library__cell--sortable">
						<span className="library__cell-header-text">Modified <i className="iconcss icon-last-modified"></i></span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--uploaded  library__cell--sortable">
						<span className="library__cell-header-text">Uploaded <i className="iconcss icon-last-modified"></i></span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--type library__cell--sortable">
						<span className="library__cell-header-text">Type</span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--status library__cell--sortable">
						<span className="library__cell-header-text">Status</span>
					</div>
					<div className="library__cell library__cell--header library__cell--header--size library__cell--sortable">
						<span className="library__cell-header-text">Size</span>
					</div>
					{/*<div className="library__cell library__cell--header library__cell--sortable js-descending">
						<span className="library__cell-header-text">Updated</span>
					</div>*/}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(mapStateToProps)(ListHeader);

