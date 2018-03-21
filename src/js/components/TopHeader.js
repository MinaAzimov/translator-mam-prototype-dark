import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import ProfileImg from './ProfileImg';
import UserSettingsMenu from './UserSettingsMenu';
import {getRoleConfig} from '../services/roles';
import SearchExpander from './SearchExpander';
import classNames from "classnames";
import { Link } from 'react-router'

import Autocomplete from 'react-autocomplete';
import { getContentItems, getContentItem } from '../services/content';
import { browserHistory } from 'react-router';


import $ from "jquery";
//import Selectbox from './Selectbox';


class TopHeader extends Component {

	render() {
		let { client } = this.props;
		return (
			<div className="top-header">
				<div className="top-header__sticky">
					<div className="top-header__left">
						<Link to="dashboard">
							<i className="fa fa-home"></i>
						</Link>
						<div className="top-header__title">
							{this.props.pageTitle}
						</div>
					</div>
					{
						client.user ?
							<div className="top-header__right">
								<HeaderSearch />
								<Notifications />
								<div className="top-header__profile">
									<span>Hi { client.user.name } ({ getRoleConfig(client.user.role).label })</span>
									<ProfileImg user={client.user} />
									<UserSettingsMenu client={client} />
								</div>
							</div>
						:
							<div>Sign in</div>
					}
				</div>
			</div>
		)
	}
}

class HeaderSearch extends Component {


	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			items: getContentItems(),
			loading: false,
			isOpen: false
		}
	}

	componentDidMount() {

		this.keyMaps = {};

		// Hot key to open the search
		const handleKey = (e) => {
			this.keyMaps[e.keyCode] = e.type == 'keydown';
			if (this.keyMaps[83] && this.keyMaps[17]) {
				e.preventDefault();
				this.setState({
					isOpen: true
				})
			}
		}

		$("body").on("keydown", handleKey);
		$("body").on("keyup", handleKey);
	}
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) {
      if (this.state.isOpen) {
        $(this.refs.container).find("input").focus();
      }
    }
  }

  toggleOpen=(e)=>{
  	e.preventDefault();
  	/*
  	if (this.closedFromBlur) {
  		this.closedFromBlur = false;
  		return;
  	}
  	*/
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onBlur = () => {
    this.setState({
      isOpen: false
    })
    this.closedFromBlur = true;
  }

	onChange = (e) => {
		let val = e.target.value;
		clearTimeout(this.loadTimeout);
		this.setState({
			searchTerm: val,
			loading: true
		})

		this.loadTimeout = setTimeout(() => {
			this.setState({
				loading: false,
				items: this.getFilteredItems(val)
			})
		}, 500);
	}

  render() {
		const { searchTerm, items, loading, isOpen } = this.state;
		const classnames = classNames({
			'header-search': true,
			'search-expander': true,
			'search-expander--open': this.state.isOpen
		})
      return (
          <div className={classnames} ref="container">
						<i className="search-expander__icon fa fa-search" onMouseDown={this.toggleOpen} tabIndex={-1}/>
						  <Autocomplete
						  	autoHighlight={true}
						  	open={this.state.searchTerm.length > 0 && isOpen}
			          value={this.state.searchTerm}
			          items={this.state.items}
			          inputProps={{
			          	className: "search-expander__input",
			          	placeholder: "Search...",
			          	ref: "input",
            			onBlur: this.onBlur
			          }}
			          getItemValue={(item) => item.title}
			          onChange={this.onChange}
			          onSelect={this.onSelect}
			          renderItem={(item, isHighlighted) => (
			            <div
			            	className={"header-search__item" + (isHighlighted ? " header-search__item--active" : "") }
			              key={item.id}
			            >
			            	<div className="selectbox__complex-list-item">
						        {
						          (item.img) ?
						            <div className="selectbox__list-item-img"><img src={item.img} /></div>
						          :
						            null
						        }
						        <div>
						          <div className="selectbox__list-item-title">{item.title}</div>
						          <div className="selectbox__list-item-subtitle">
						          	{item.subtitle}
						          </div>
 											{
						          	item.status === "Published" ? 
							          	<div className="selectbox__list-item-status published">
								          	{item.publishDate}
								          </div>
								        :
							          	<div className={"selectbox__list-item-status " + item.status}>
								          	{item.status}
								          </div>
											}

						        </div>
      							</div>
			            </div>
			          )}
			          renderMenu={(items, value, style) => (
			            <div className="header-search__menu">
			              {value === '' ? (
			                null
			              ) : this.state.loading ? (
			                <div className="header-search__loading">Loading...</div>
			              ) : items.length === 0 ? (
			                <div className="header-search__no-results">No matches for {value}</div>
			              ) : this.renderItems(items)}
			            </div>
			          )}
			        />
          </div>
      )
  }

  getFilteredItems(term) {
  	if (term === '') {
  		return getContentItems();
  	}
  	else if (term[0] === ":") {
  		let contentId = parseInt(term.split(":")[1]);
  		let item = getContentItem(contentId);
  		if (item) {
  			return [item]
  		}
  		else {
  			return []
  		}
  	}
  	else {
  		return getContentItems().filter((item) => {
  			return item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1
  		});
  	}
  }
  
  onSelect = (value, state) => {
  	this.setState({ 
  		searchTerm: ""
  	}); 
  	browserHistory.push('/edit');
  }

  renderItems(items) {
  	return items;
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.client
  }
}

export default connect(mapStateToProps)(TopHeader);
