import React, { Component, PropTypes } from 'react';
import { titles } from '../../../mock/titles.js';
import Autosuggest from 'react-autosuggest';

import classNames from "classnames";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return titles
    .map(section => {
      return {
        title: section.title,
        titles: section.titles.filter(item => regex.test(item.name))
      };
    })
    .filter(section => section.titles.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.titles;
}

export default class ExistingTitles extends Component {
 constructor() {
    super();

    this.state = {
    	dropdownOpen: false,
    	searchOpen: false,
      value: '',
      suggestions: []
    };  

    this.handleClickOutside = this.handleClickOutside.bind(this);  
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.refs.wrapper.contains(event.target)) {
      this.setState({
        dropdownOpen: false,
        searchOpen: false,
        value: ''
      });
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  openDropdown = () => {
    this.setState({
      dropdownOpen: true
    });
  };

  openSearch = () => {
    this.setState({
      searchOpen: true
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search For Title",
      value,
      onChange: this.onChange
    };

    const classnames = classNames({
      "existing-titles": true,
      "existing-titles--show-dropdown": this.state.dropdownOpen,
      "existing-titles--show-search": this.state.searchOpen
    })

    const { newTitle } = this.props;

    return (
    	<div ref="wrapper" className={classnames}>
	    	<button onClick={this.openDropdown} className="apply">New Project<i className="iconcss icon-plus"></i></button>
	    	<ul className="dropdown">
		    	<button onClick={newTitle.bind(this)} className="dropdown-button">New Title<i className="iconcss icon-plus"></i></button>
		    	<button onClick={this.openSearch} className="dropdown-button">Existing Title<i className="iconcss icon-plus"></i></button>
		      <Autosuggest 
		        multiSection={true}
		        suggestions={suggestions}
		        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
		        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
		        getSuggestionValue={getSuggestionValue}
		        renderSuggestion={renderSuggestion}
		        renderSectionTitle={renderSectionTitle}
		        onSuggestionSelected={newTitle.bind(this)}
		        getSectionSuggestions={getSectionSuggestions}
		        inputProps={inputProps} />
        </ul>
      </div>
    );
  }
}