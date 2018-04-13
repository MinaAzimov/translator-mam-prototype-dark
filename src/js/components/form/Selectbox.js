import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom"; 
import classNames from 'classnames';

import $ from "jquery";



export default class Selectbox extends React.Component {

  static defaultProps = {
    hideMenuUntilType: false
  }


  constructor(props) {
    super(props);

    let value = props.value;

    this.state= {
      selectedOption: value ? value : null,
      textValue: "",
      isFocused: props.stealFocus === true,
      highlightedOption: -1,
      filteredItems: props.items,
      isDetected: (this.props.detected) ? true : false
    }

    // We use native events to detect clicks on the document body
    this.documentClickHandler = (e) => {
      var el = e.target;
      // Clicking outside this component
      if ($(el).closest(this.refs.container).length == 0) {
        e.stopPropagation();
        this.unFocus();
      }
    }
  }

  componentDidMount() {
    if (this.props.stealFocus) {
      this.refs.theInput.focus();
    }
  }

  componentWillReceiveProps(nextProps) {

  	// Update the filtered items if there are new items
  	let filteredItems = this.getFilteredItems(nextProps.items, this.state.textValue);
		this.setState({
		  filteredItems: filteredItems
		});
  }

  getFilteredItems(items, value) {
    // Filters the items
    var filteredItems;
    if (this.props.search) {
      filteredItems = (value) ?
        items.filter(function(item, index) {
          // Searches the string for our typed in one
          var result = (item.title).search(new RegExp(value, "i"));
          return (result !== -1);
        }.bind(this))
      :
        items;
    }
    else {
      filteredItems = items;
    }
    return filteredItems;
  }

  onFocus(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isFocused: true,
      isDetected: false
    });

  }

  unFocus() {

    this.setState({
      isFocused: false
    });

  }

  focus() {
    this.setState({
      isFocused: true
    });
  }

  onTextboxChange(e) {

    let value = e.target.value;
    let filteredItems = this.getFilteredItems(this.props.items, value);
    // If there are no filtered results, it means we are typing in a custom string.
    // In this case deselect the current selection
    let selectedOption = (filteredItems.length === 0) ? null : this.state.selectedOption;
    let highlightedOption = (filteredItems.length === 0) ? -1 : this.state.highlightedOption;

    this.setState({
      textValue: value,
      filteredItems: filteredItems,
      selectedOption: selectedOption,
      highlightedOption: highlightedOption
    })


  }


  onKeyDown(e) {
    var index, length;
    const highlighted = this.state.highlightedOption;

    switch (e.keyCode) {
        // Return
        case 13: {

          if (!this.state.isFocused) {
            return;
          }

        	let item = this.state.filteredItems[highlighted];
        	if (item) {
        		this.selectOption(item);
        	}
        	else {
        		this.selectOption(null);
        	}
          //this.selectOption(this.state.filteredItems[this.state.highlightedOption]);
          e.stopPropagation();
          e.preventDefault();
          break;

        }
        // Escape
        case 27:
          this.unFocus();
          e.stopPropagation();
          e.preventDefault();
          break;
        // Tab
        case 9:
          this.unFocus();
          break;
        // Up
        case 38:
          var newHighlightedOption = Math.max(-1, highlighted - 1);
          this.setState({
            highlightedOption: newHighlightedOption
          });
          e.stopPropagation();
          e.preventDefault();
          break;

        // Down
        case 40:
          var highlightedOption = Math.min(this.state.filteredItems.length - 1, highlighted + 1);
          this.setState({
            highlightedOption: highlightedOption
          });
          e.stopPropagation();
          e.preventDefault();
          break;
    }
  }


  highlightOption(index) {
    this.setState({
      highlightedOption: index
    })
  }

  selectOption(item, e) {

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (item && item.disabled) {
      return;
    }

    this.setState({
      selectedOption: item,
      textValue: "",
      isFocused: false
    });

    if (this.props.onChange) {
      this.props.onChange(item);
    }
      console.log(item)
  }

  optionMousedown(index, e) {
    e.preventDefault();
    this.selectOption(index);
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    var self = this;

    if (!prevState.isFocused && this.state.isFocused) {
      if (this.props.search) {
        let el = ReactDOM.findDOMNode(this.refs.theInput);
        el.focus();
      }
      document.addEventListener("click", self.documentClickHandler, false);
    }

    else if (prevState.isFocused && !this.state.isFocused) {
      document.removeEventListener("click", self.documentClickHandler, false);
      // As a result of selecting, we kill the <input> element so body will
      // recieve focus. This is annoying if you're inside a form because
      // you can't tab/hit enter, so lets refocus an input in the form
      let $form = $(this.refs.container).closest("form");
      if ($form.length > 0) {
        $form.find("input").focus();
      }
    }
  }

  render() {

    const selectedOption = (this.state.isDetected) ? this.props.detected : this.props.value;
    const { allowCustomText, hideMenuUntilType } = this.props;
    const { textValue, filteredItems, isFocused } = this.state;
    const stateNotEmpty = (selectedOption) ? true : false;

    var classnames = classNames({
      "selectbox__field": true,
      "selectbox__field--complex": true,
      "selectbox_state_not-empty": stateNotEmpty,
      "selectbox_state_focused": this.state.isFocused,
      "selectbox_state_detected": this.state.isDetected,
      "selectbox_show-list": hideMenuUntilType ? isFocused && textValue : isFocused,
      "selectbox_state_err": this.props.errorMsg,
      "selectbox_state_required": this.props.required
    });

    var placeholderText = (selectedOption) ? selectedOption.title : textValue;
    var placeholder;

    if (!this.props.showComplex && stateNotEmpty) {
      placeholder= (
          <div className="selectbox__placeholder">{selectedOption.title}</div>
      )
    }
    else if (stateNotEmpty) {
      placeholder = (
        <div className="selectbox__placeholder-box">
          <ComplexListItem item={selectedOption} />
        </div>
      )
    }
    else if (textValue && allowCustomText) {
      placeholder = (
        <div className="selectbox__placeholder-box">
          <div>{this.state.textValue}</div>
          <div>External URL</div>
        </div>
      )
    }
    else {
      placeholder = <div className="selectbox__placeholder"></div>
    }

    return (
    	<div className="selectbox__wrapper">
	      <div className={classnames} ref="container" tabIndex="0">
	        <div className="selectbox__input" onClick={this.onFocus.bind(this)} onKeyDown={this.onKeyDown.bind(this)} tabIndex="-1">
	           <i className="selectbox__down-icon fa fa-sort-desc"></i>
            {
	            (this.props.search && this.state.isFocused) ?
	              <input
                  tabIndex="-1"
	              	placeholder={this.props.inputPlaceholder}
	              	ref="theInput"
	              	type="text"
	              	value={this.state.textValue}
	              	className="selectbox__searchfield"
	              	onChange={this.onTextboxChange.bind(this)}/>
	            :
	              placeholder
	          }
	        </div>
	        <label className="selectbox__label">{this.props.label}<span className="selectbox__label_required">{(this.props.required) ? "*" : null}</span></label>
	        <div className="selectbox__help-text">{this.props.helpText}</div>
	        <div className="selectbox__err-msg">{this.props.errorMsg}</div>
	        <SelectList
	          items={filteredItems}
	          highlightedOption={this.state.highlightedOption}
	          selectedOption={selectedOption}
	          highlightOption={this.highlightOption.bind(this)}
	          selectOption={this.selectOption.bind(this)}
	          showComplex={this.props.showComplex}
            disableNone={this.props.disableNone}

	          />
	      </div>
      </div>
    );
  }
}

Selectbox.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  helpText: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  allowCustomText: PropTypes.bool,
  search: PropTypes.bool,
  showComplex: PropTypes.bool,
  stealFocus: PropTypes.bool,
  hideMenuUntilType: PropTypes.bool
}








/*----- SELECT LIST ----- */

const SelectList = class SelectList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    // Scrolls the container when the highlighted index changes to
    // reveal overflowed list items
    if (this.props.highlightedOption !== prevProps.highlightedOption &&
    		this.props.highlightedOption !== -1) {
      var container  = $(this.refs.container);
      var listItem   = container.find("li.is-hightlighted");
      var top        = listItem.position().top - $(this.refs.offsetOrigin).position().top;
      var height     = container.height();
      if (top > (container.scrollTop() + height)) {
        container.animate({
          scrollTop: top
        }, 200)
      }
      else if (top < container.scrollTop() - 50) {
        container.animate({
          scrollTop: top - 150
        }, 200)
      }
    }
  }

  render() {
    const {highlightedOption, selectedOption, selectOption, highlightOption, disableNone} = this.props;
    return (
        <ul className="selectbox__list" ref="container">
          <li ref="offsetOrigin"></li>
          {!disableNone && <li
            className={"selectbox__list-item" + (highlightedOption === -1 ? " is-hightlighted" : "") }
            key={-1}
            onClick={selectOption.bind(this, null)}
            onMouseOver={highlightOption.bind(this, -1)}
          >
            <div className={"selectbox__list-item-title"}></div>
          </li>
          }
          {
            this.props.items.map(function(item, index) {

              var classnames = classNames({
                "selectbox__list-item": true,
                "is-hightlighted": highlightedOption === index,
                "selectbox__list-item--selected": (this.props.selectedOption) && (item.id === this.props.selectedOption.id),
                "selectbox__list-item--disabled": (item.disabled === true)
              });

              return (
                <li key={index} className={classnames}
                    onMouseOver={highlightOption.bind(this, index)}
                    onClick={selectOption.bind(this, item)}>

                  {
                    this.props.showComplex ?
                      (
                        <div>
                          <ComplexListItem item={item} />
                        </div>
                      )
                    :
                      <div className="selectbox__list-item-title">{item.title}</div>
                  }
                </li>
              )
            }.bind(this))
          }
        </ul>
    );
  }
}






/*----- COMPLEX LIST ITEM ----- */

const ComplexListItem = class ComplexListItem extends React.Component {
  render() {
    return (
      <div className="selectbox__complex-list-item">
        {
          (this.props.item.img) ?
            <div className="selectbox__list-item-img"><img src={this.props.item.img} /></div>
          :
            null
        }
        <div>
          <div className="selectbox__list-item-title">{this.props.item.title}</div>
          <div className="selectbox__list-item-subtitle">
          	{this.props.item.subtitle}
          </div>
        </div>
        {/*<div className="selectbox__list-item-status">Published</div>*/}
      </div>
    )
  }
}
