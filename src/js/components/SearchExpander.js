

import React, { Component, PropTypes } from 'react';
import classNames from "classnames";


export default class SearchExpander extends Component {

  static defaultProps = {
    placeholder: "Search",
    onChange: (val)=>{}
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) {
      if (this.state.isOpen) {
        this.refs.input.focus();
      }
    }
  }

  toggleOpen=()=>{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onBlur = () => {
    this.setState({
      isOpen: false
    })
  }

  onChange = (e) => {
    let val = this.refs.input.value;
    this.props.onChange(val);
  }

  render() {
    let classnames = classNames({
      "search-expander": true,
      "search-expander--open": this.state.isOpen
    })
    return (
        <div className={classnames}>
					<input className="search-expander__input" 
            placeholder={this.props.placeholder} ref="input" 
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
					<i className="search-expander__icon fa fa-search" onClick={this.toggleOpen}/>
        </div>
    )
  }
}