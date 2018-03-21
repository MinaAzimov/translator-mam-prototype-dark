import React, { Component, PropTypes } from 'react';
import BaseLayout from './BaseLayout';
import MultiSelectbox from './form/MultiSelectbox';
import Selectbox from './form/Selectbox';
import Switch from './form/Switch';
import { isEqual } from 'lodash';

import { connect } from 'react-redux';
import classNames from "classnames";
import contentLibrary from '../../../mock/contentlibrary.json';
import S from 'string';
import $ from "jquery";
import { getAllUsers } from "../services/users";
import WaypointReact from './Waypoint';

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
];

const statusList = [
	{
		title: "Published",
		id: 0
	},
  {
    title: "Draft",
    id: 1
  },
	{
		title: "Not Published",
		id: 2
	}
];

const categories = [
  "US News & Analysis",
  "US Homepage",
  "Economy",
  "Finance",
  "Health Care",
  "Real Estate",
  "Wealth",
  "Autos",
  "Earnings",
  "Energy",
  "Life",
  "Media",
  "Politics",
  "Retail",
  "Trading Nation",
  "Technology",
  "Market"
];

const tags = [
  "Donald Trump",
  "Hillary Clinton",
  "Apple Inc US",
  "Facebook US",
  "Netflix Inc US",
  "Paul Ryan"
];

const pagesItems = [
  {
    id: 0,
    title: "10"
  },
  {
    id: 1,
    title: "20"
  },
  {
    id: 2,
    title: "30"
  },
	{
    id: 3,
    title: "40"
  }
];

const usersList = getAllUsers().map(user => {
  return {
    title: user.name,
    id: user.id
  }
});

const DEFAULT_FILTERS = {
  type: null,
  status: null,
  sections: [],
  tags: [],
  createdByMe: false,
  createdBy: null
};

const ASC = 'asc';
const DESC = 'desc';
const DEFAULT_SORT_DIRECTION = ASC;

// STATUSES Constants
const STATUSES_ORDER = [
  'Not Published',
  'Draft',
  'Published'
];

class ContentIndex extends Component {


  constructor(props) {
    super(props);

    let results = contentLibrary;

    this.state = {
      filters: {...DEFAULT_FILTERS},
      appliedFilters: {...DEFAULT_FILTERS},
      sortField: '',
      sortDirection: DEFAULT_SORT_DIRECTION,
      paginationSize: 10,
      paginationPage: 0,
      mobileFiltersOpen: false,
      pageInputValue: null,
      searchTerm: "",
      results: results,
      filtersHaveChanged: false,
      stickyTable: false
    };
  }



  componentDidMount() {
    // This code should eventually be replaced
    $('.favorite-page').click( function() {
      $(this).toggleClass("active");
    });

		$('.library-item-end').click( function() {
      $(this).parent().parent().toggleClass("active");
    });

		$('.fa-filter').click( function(){
			$('.library-filters-wrapper').addClass("active");
		});

		$('.filter-close').click( function(){
			$('.library-filters-wrapper').removeClass("active");
		});




  }

  isApplyEnabled = () => {
    //return !isEqual(this.state.filters, this.state.appliedFilters) || this.state.searchTerm !== "";
    return this.state.filtersHaveChanged;
  };

  isResetEnabled = () => {
    return !isEqual(this.state.filters, DEFAULT_FILTERS) || this.state.searchTerm !== "";
  };

  setFilter = (filterType, value) => {
    this.setState({
      filters: { ...this.state.filters, [filterType]: value },
      paginationPage: 0,
      filtersHaveChanged: true
    })
  };

  reset = () => {
    this.setState({
      filters: { ...DEFAULT_FILTERS },
      appliedFilters: { ...DEFAULT_FILTERS },
      sortField: '',
      paginationPage: 0,
      searchTerm: "",
      results: contentLibrary,
      filtersHaveChanged: false
    });
  };

  applyFilters = (e) => {
    if (e) {
      e.preventDefault();
    }
    $('.library-filters-wrapper').removeClass("active");

    let content = this.filterItems(contentLibrary);

    /*,
      searchTerm: this.refs['search'].value
*/
    this.setState({
      appliedFilters: {...this.state.filters},
      sortField: '',
      mobileFiltersOpen: false,
      paginationPage: 0,
      results: content,
      filtersHaveChanged: false
    });
  };

  filterItems = (items) => {

    let filtered = items.slice();
    const filters = this.state.filters;
    const searchTerm = this.state.searchTerm;

    if (filters.type) {
      filtered = filtered.filter(item => String(item.type).toLowerCase() === String(filters.type.title).toLowerCase());
    }
    if (filters.status) {
      filtered = filtered.filter(item =>
        String(item.status).toLowerCase() === String(filters.status.title).toLowerCase()
      );
    }
    if (filters.sections.length) {
      filtered = filtered.filter(item => !!item.sections.find(section => filters.sections.indexOf(section) !== -1 ));
    }
    if (filters.tags.length) {
      filtered = filtered.filter(item => !!item.tags.find(tag => filters.tags.indexOf(tag) !== -1 ));
    }
    if (filters.createdBy) {
      const username = filters.createdBy.title.toLowerCase();
      filtered = filtered.filter(item => username === String(item.createdAuthor).toLowerCase());
    }
    if (searchTerm) {
      let re = new RegExp(searchTerm.toLowerCase());
      filtered = filtered.filter(item => {
        let searchField = item.title.toLowerCase();
        let result = searchField.match(re);
        return (result && result.length > 0);
      });
    }

    return filtered;
  };

  setSortField = (field) => {
    if (this.state.sortField === field) {
      this.setSort(field, this.state.sortDirection === ASC ? DESC : ASC);
    } else {
      this.setSort(field, DEFAULT_SORT_DIRECTION);
    }
  };

  setSort = (field, direction) => {
    this.setState({
      sortField: field,
      sortDirection: direction,
      paginationPage: 0
    });
  };

  applySort = (contentItems) => {
    let sorted = contentItems.slice();
    switch (this.state.sortField) {
      case 'title':
      case 'type':
      case 'createdTimestamp':
      case 'updatedTimestamp':
        sorted = sorted.sort((itemA, itemB) => {
          const a = itemA[this.state.sortField];
          const b = itemB[this.state.sortField];
          return this.state.sortDirection === ASC ? a<b?-1:(a>b?1:0) : a<b?1:(a>b?-1:0);
        });
        break;
      case 'status':
        sorted = sorted.sort((itemA, itemB) => {
          const a = STATUSES_ORDER.indexOf(itemA.status);
          const b = STATUSES_ORDER.indexOf(itemB.status);
          return this.state.sortDirection === ASC ? a<b?-1:(a>b?1:0) : a<b?1:(a>b?-1:0);
        });
        break;
    }
    return sorted;
  };

  setItemsPerPage = (field) => {
    this.setState({
      paginationSize: parseInt(field.title, 10),
      paginationPage: 0
    });
  };

  applyPagination = (contentItems) => {
    const totalItems = contentItems.length;
    const start = this.state.paginationPage * this.state.paginationSize;
    let end = (this.state.paginationPage + 1) * this.state.paginationSize;
    end = end > totalItems ? totalItems : end;
    return contentItems.slice(start, end);
  };

  setPage = (page) => {
    this.setState({
      paginationPage: page
    });
  };

  onPageInputChange = (totalPages, event) => {
    const value = event.target.value;
    const intValue = parseInt(value);
    if (value && intValue > 0) {
      this.setState({
        paginationPage: intValue > totalPages ? (totalPages - 1) : (intValue - 1),
        pageInputValue: null
      });
    } else {
      this.setState({
        pageInputValue: value
      });
    }
  };

  onPageInputBlur = (event) => {
    const value = event.target.value;
    if (!value) {
      this.setState({
        pageInputValue: null
      });
    }
  };

  onScrollToSticky = (direction) => {
    this.setState({
      stickyTable: direction === "down"
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      filtersHaveChanged: true
    })
  }

  render() {

    const { fields } = this.props;
    //let content = this.state.results;
    let content = this.applySort(this.state.results);


    const classnames = classNames({
      'content-index': true,
      'page-wrapper': true,
      'content-index--sticky-table': this.state.stickyTable
    });
    const sortDirectionClassname = this.state.sortDirection === ASC ? 'js-ascending' : 'js-descending';
    const totalItems = content.length;
    const totalPages = Math.ceil(totalItems / this.state.paginationSize);
    const paginationStartText = this.state.paginationPage * this.state.paginationSize + 1;
    let paginationEndText = (this.state.paginationPage + 1) * this.state.paginationSize;
    paginationEndText = paginationEndText > totalItems ? totalItems : paginationEndText;
    const paginationLeftOnClick = this.state.paginationPage > 0 ? this.setPage.bind(this, this.state.paginationPage - 1) : () => {};
    const paginationRightOnClick = this.state.paginationPage + 1 < totalPages ? this.setPage.bind(this, this.state.paginationPage + 1) : () => {};
    content = this.applyPagination(content);

    return (
      <div className={classnames}>
        <BaseLayout fields={fields} pageTitle="Content Library">
          <div className="page-title__wrapper">
            <div className="page-title">
              Content Library
            </div>
          </div>
          <div className="library-search">
            <div className="library-search--inner">
              <i className="fa fa-search"></i>
              <form onSubmit={this.applyFilters}>
                <input
                  value={this.state.searchTerm}
                  placeholder="Search"
                  onChange={this.onSearchChange}
                />
              </form>
            </div>

          </div>
          <div className="library-filters">
            <div className="library-filters-title">
              <i className="fa fa-filter" /> <span>Filter:</span>
            </div>
            <div className="library-filters-wrapper">
              <i className="iconcss icon-close filter-close" />
              <div className="library-filter-label">Filters</div>
                <div className="library-filter-item">
                  <Selectbox
                    label="Type"
                    value={this.state.filters.type}
                    items={typeList}
                    onChange={this.setFilter.bind(this, 'type')}
                  />
                </div>
                <div className="library-filter-item">
                  <Selectbox
                    label="Status"
                    value={this.state.filters.status}
                    items={statusList}
                    onChange={this.setFilter.bind(this, 'status')}
                  />
                </div>
                <div className="library-filter-item">
                  <MultiSelectbox
                    value={this.state.filters.sections}
                    label="Sections"
                    onChange={this.setFilter.bind(this, 'sections')}
                    options={categories}
                  />
                </div>
                <div className="library-filter-item">
                  <MultiSelectbox
                    value={this.state.filters.tags}
                    label="Tags"
                    onChange={this.setFilter.bind(this, 'tags')}
                    options={tags}
                  />
                </div>

                <div className="library-filter-item">
                  <Selectbox
                    label="Created by"
                    value={this.state.filters.createdBy}
                    items={usersList}
                    onChange={this.setFilter.bind(this, 'createdBy')}
                  />
                </div>

              </div>
              <div className="library-filter-controls filters__controls">
                <button className={`apply ${this.isApplyEnabled() ? '' : 'disabled'}`} onClick={this.applyFilters}>Apply</button>
                <button className={`reset ${this.isResetEnabled() ? '' : 'disabled'}`} onClick={this.reset}>Reset</button>
              </div>
          </div>

          <div className="library-container">
            <div className="library-pagination-bar">
							<div className="library-pagination">
								<Selectbox
									label="Items per page"
									value={pagesItems.find(option => parseInt(option.title) === this.state.paginationSize )}
									items={pagesItems}
									onChange={this.setItemsPerPage}
                  disableNone
								/>
							</div>
              <div className="js-dropdownWrapper">
                <button className="button button_style_transparent-gray u-noMargin js-dropdownItem" id="sortContentDropdown">
                  <i className="fa fa-sort-amount-asc"></i>
                </button>
                <ul className="c-Dropdown-list" style={{left: '0px', top: '100%'}}>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'title', ASC)}>
                    <span>Title A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'title', DESC)}>
                    <span>Title Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'type', ASC)}>
                    <span>Type A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'type', DESC)}>
                    <span>Type Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'status', ASC)}>
                    <span>Status A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'status', DESC)}>
                    <span>Status Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'updatedTimestamp', ASC)}>
                    <span>Updated Date 0-9</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'updatedTimestamp', DESC)}>
                    <span>Updated Date 9-0</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'createdTimestamp', ASC)}>
                    <span>Created Date 0-9</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'createdTimestamp', DESC)}>
                    <span>Created Date 9-0</span>
                  </li>
                </ul>
              </div>
							<div className="library-pages">
								<div className="library-page-numbers">{paginationStartText} - {paginationEndText} of {totalItems} Total</div>
								<div className="library-page-controls">
									<i
                    className={`fa fa-angle-left ${this.state.paginationPage === 0 ? 'disabled' : ''}`}
                    onClick={paginationLeftOnClick}
                  />
                  <input
                    value={this.state.pageInputValue !== null ? this.state.pageInputValue : (this.state.paginationPage + 1)}
                    pattern="(\s*|\d+)"
                    onBlur={this.onPageInputBlur}
                    ref="pageNumberInput"
                    onChange={this.onPageInputChange.bind(this, totalPages)}
                    className="library-page-input"
                  />
									<i className={`fa fa-angle-right ${this.state.paginationPage + 1 >= totalPages ? 'disabled' : ''}`}
                     onClick={paginationRightOnClick}
                  />
								</div>
							</div>
						</div>
            <table className="library-table library-table__sticky-header">
              <thead className="library-header">
                <tr className="library-header-row">
                  <th className="library-item library-header-item"></th>
                  <th className="library-item library-header-item">Thumbnail</th>
                  <th
                    className={`${this.state.sortField === 'title' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'title')}
                  >
                    <span className="library__cell-header-text">Title</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'type' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'type')}
                  >
                    <span className="library__cell-header-text">Type</span>

                  </th>
                  <th
                    className={`${this.state.sortField === 'status' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'status')}
                  >
                    <span className="library__cell-header-text">Status</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'updatedTimestamp' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'updatedTimestamp')}
                  >
                    <span className="library__cell-header-text">Updated</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'createdTimestamp' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'createdTimestamp')}
                  >
                    <span className="library__cell-header-text">Created</span>
                  </th>
                  <th className="library-item library-header-item">Sections</th>
                  <th className="library-item library-header-item">Tag</th>
                </tr>
              </thead>
            </table>

            <WaypointReact handler={this.onScrollToSticky} offset={60} />

            <table className="library-table">

              <thead className="library-header">
                <tr className="library-header-row">
                  <th className="library-item library-header-item"></th>
                  <th className="library-item library-header-item">Thumbnail</th>
                  <th
                    className={`${this.state.sortField === 'title' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'title')}
                  >
                    <span className="library__cell-header-text">Title</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'type' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'type')}
                  >
                    <span className="library__cell-header-text">Type</span>

                  </th>
                  <th
                    className={`${this.state.sortField === 'status' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'status')}
                  >
                    <span className="library__cell-header-text">Status</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'updatedTimestamp' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'updatedTimestamp')}
                  >
                    <span className="library__cell-header-text">Updated</span>
                  </th>
                  <th
                    className={`${this.state.sortField === 'createdTimestamp' ? sortDirectionClassname : ''} library-item library-header-item library__cell--sortable`}
                    onClick={this.setSortField.bind(this, 'createdTimestamp')}
                  >
                    <span className="library__cell-header-text">Created</span>
                  </th>
                  <th className="library-item library-header-item">Sections</th>
                  <th className="library-item library-header-item">Tag</th>
                </tr>
              </thead>

              <tbody>
                {content.map((item,index) => <tr className="library-item-row" key={index}>
                  <td className="favorite-container">
                    <div className="favorite-page">
                      <i className="iconcss icon-star" />
                      <div className="favorite-tooltip">Add to Favorites</div>
                    </div>
                    <div className="favorite-page">
                      <i className="iconcss icon-flag" />
                      <div className="favorite-tooltip">Add to Status Tracker</div>
                    </div>
                    <div className="favorite-page">
                      <i className="iconcss icon-chart" />
                      <div className="favorite-tooltip">Add to Article Statistics</div>
                    </div>
                  </td>
                  <td className="library-item">
                    <img className="library-item-thumb" src={item.src} />
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{item.title}</div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">
                      {item.type}
                      {
                        item.source ?
                          <div className="library-item-source" title={"Source: " + item.source}>
                            {
                              item.source === "New York Times" ?
                                <img src="/assets/img/icons/nyt-logo.png" />
                              :
                                <img src="/assets/img/icons/ft-logo.png" />
                            }
                          </div>
                        : 
                          null
                      }
                    </div>
                  </td>
                  <td className="library-item">
                    <div className={`library-item-text library-item-status ${S(item.status).slugify().s.toLowerCase()}`}>
                      {item.status}
                    </div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{item.updated}</div>
                    <div className="library-item-user">by {item.updatedAuthor}</div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{item.created}</div>
                    <div className="library-item-user">by {item.createdAuthor}</div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{item.sections.join(', ')}</div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{item.tags.join(', ')}</div>
                  </td>
                  <td>
                    <div className="library-item-end">
                      <i className="fa fa-angle-down" />
                    </div>
                  </td>
                </tr>)}

              </tbody>

            </table>


            <div className="library-pagination-bar">
              <div className="library-pagination">
                <Selectbox
                  label="Items per page"
                  value={pagesItems.find(option => parseInt(option.title) === this.state.paginationSize )}
                  items={pagesItems}
                  onChange={this.setItemsPerPage}
                  disableNone
                />
              </div>
              <div className="js-dropdownWrapper">
                <button className="button button_style_transparent-gray u-noMargin js-dropdownItem" id="sortContentDropdown">
                  <i className="fa fa-sort-amount-asc"></i>
                </button>
                <ul className="c-Dropdown-list" style={{left: '0px', top: '100%'}}>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'title', ASC)}>
                    <span>Title A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'title', DESC)}>
                    <span>Title Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'type', ASC)}>
                    <span>Type A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'type', DESC)}>
                    <span>Type Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'status', ASC)}>
                    <span>Status A-Z</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'status', DESC)}>
                    <span>Status Z-A</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'updatedTimestamp', ASC)}>
                    <span>Updated Date 0-9</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'updatedTimestamp', DESC)}>
                    <span>Updated Date 9-0</span>
                  </li>
                  <li className="dropdown__divider"></li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'createdTimestamp', ASC)}>
                    <span>Created Date 0-9</span>
                  </li>
                  <li className="dropdown__list-item" onClick={this.setSort.bind(this, 'createdTimestamp', DESC)}>
                    <span>Created Date 9-0</span>
                  </li>
                </ul>
              </div>
              <div className="library-pages">
                <div className="library-page-numbers">{paginationStartText} - {paginationEndText} of {totalItems} Total</div>
                <div className="library-page-controls">
                  <i
                    className={`fa fa-angle-left ${this.state.paginationPage === 0 ? 'disabled' : ''}`}
                    onClick={paginationLeftOnClick}
                  />
                  <input
                    value={this.state.pageInputValue !== null ? this.state.pageInputValue : (this.state.paginationPage + 1)}
                    pattern="(\s*|\d+)"
                    onBlur={this.onPageInputBlur}
                    ref="pageNumberInput"
                    onChange={this.onPageInputChange.bind(this, totalPages)}
                    className="library-page-input"
                  />
                  <i className={`fa fa-angle-right ${this.state.paginationPage + 1 >= totalPages ? 'disabled' : ''}`}
                     onClick={paginationRightOnClick}
                  />
                </div>
              </div>
            </div>

          </div>
        </BaseLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fields: state.fields,
    client: state.client
  }
}

export default connect(mapStateToProps)(ContentIndex);
