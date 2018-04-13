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
    title: "Image",
    id: 0
  },
  {
    title: "Video",
    id: 1
  },
  {
    title: "Audio",
    id: 2
  }
];

const statusList = [
  {
    title: "Needs Metadata",
    id: 0
  },
  {
    title: "Ready For Ingest",
    id: 1
  },
  {
    title: "Ready For Service",
    id: 2
  },
  {
    title: "Search Optimized",
    id: 2
  }
];

const materialTypeList = [
  {
    title: "Promo",
    id: 0
  },
  {
    title: "Episodic",
    id: 1
  },
  {
    title: "Theatrical",
    id: 2
  },
  {
    title: "Footage",
    id: 3
  },
  {
    title: "Short",
    id: 3
  },
  {
    title: "SFX",
    id: 4
  },
  {
    title: "Voice Over",
    id: 5
  },
  {
    title: "Descriptive Audio",
    id: 6
  },
  {
    title: "Original Audio",
    id: 7
  },
  {
    title: "Podcast",
    id: 8
  },
  {
    title: "Music",
    id: 9
  },
  {
    title: "Dubs",
    id: 10
  },
  {
    title: "Photography",
    id: 11
  },
  {
    title: "Graphic",
    id: 12
  },
  {
    title: "Art",
    id: 13
  },
  {
    title: "Print",
    id: 14
  },
  {
    title: "Logo",
    id: 15
  }
];


const versionTypeList = [
  {
    title: "International Broadcast Master",
    id: 0
  },
  {
    title: "Domestic Broadcast Master",
    id: 1
  },
  {
    title: "International [Territory] OFCOM Compliant",
    id: 2
  },
  {
    title: "Broadcast Master",
    id: 3
  },
  {
    title: "Uncensored Master",
    id: 4
  },
  {
    title: "Submaster",
    id: 5
  }
];


const productionTypeList = [
  {
    title: "Digital",
    id: 0
  },
  {
    title: "Broadcast",
    id: 1
  },
  {
    title: "Event",
    id: 2
  }
];

const keywords = [
  "Backstage",
  "Episode Recap",
  "Red Carpet",
  "Fun Facts"
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
  versionType: null,
  materialType: null,
  keywords: [],
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

class DropzoneFilter extends Component {


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
    if (filters.keywords.length) {
      filtered = filtered.filter(item => !!item.keywords.find(tag => filters.keywords.indexOf(tag) !== -1 ));
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
          <div className="library-filters">
            {/*<div className="library-filters-title">
              <i className="fa fa-filter"/> <span>Filter:</span>
            </div>*/}
            <div className="library-filters-wrapper">
              <i className="iconcss icon-close filter-close" />
	            <div className="library-filter-label"><i className="iconcss icon-filter"></i>Filters:</div>
                <div className="library-filter-item">
                  <Selectbox
                    label="Material Type"
                    value={this.state.filters.materialType}
                    items={materialTypeList}
                    onChange={this.setFilter.bind(this, 'materialType')}
                  />
                </div>

                {/*<div className="library-filter-item">
                  <Selectbox
                    label="Type"
                    value={this.state.filters.type}
                    items={typeList}
                    onChange={this.setFilter.bind(this, 'type')}
                  />
                </div>*/}

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
                    value={this.state.filters.keywords}
                    label="Keywords"
                    onChange={this.setFilter.bind(this, 'keywords')}
                    options={keywords}
                  />
                </div>

                <div className="library-filter-item">
                  <Selectbox
                    label="Owner"
                    value={this.state.filters.createdBy}
                    items={usersList}
                    onChange={this.setFilter.bind(this, 'createdBy')}
                  />
                </div>

                <div className="library-filter-item">
                  <Selectbox
                    label="Version Type"
                    value={this.state.filters.versionType}
                    items={versionTypeList}
                    onChange={this.setFilter.bind(this, 'versionType')}
                  />
                </div>

                {/*<div className="library-filter-item">
                  <Selectbox
                    label="Production Type"
                    value={this.state.filters.status}
                    items={statusList}
                    onChange={this.setFilter.bind(this, 'status')}
                  />
                </div>*/}
        				<div className="library-filter-controls filters__controls">
	              	<button className={`apply ${this.isApplyEnabled() ? '' : 'disabled'}`} onClick={this.applyFilters}>Apply</button>
	                <button className={`reset ${this.isResetEnabled() ? '' : 'disabled'}`} onClick={this.reset}>Reset</button>
  	            </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(DropzoneFilter);
