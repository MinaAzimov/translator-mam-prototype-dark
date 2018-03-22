import React, { Component, PropTypes } from 'react';
import classNames from "classnames";


export default class RegistrationStatus extends Component {

  static propTypes = {
    isReadyForIngest: PropTypes.bool,
    isReadyForService: PropTypes.bool,
    isSearchOptimized: PropTypes.bool
  };

  static defaultProps = {
    isReadyForIngest: false,
    isReadyForService: false,
    isSearchOptimized: false
  }

	render() {
    const { isReadyForIngest, isReadyForService, isSearchOptimized } = this.props;
		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		
    return (
			<div className="">
        <svg
          style={{
            display: "inlineBlock",
            color: "rgba(255, 255, 255, 0.87)",
            fill: "transparent",
            height: "18px",
            width: "71px",
            userSelect: "none",
            viewBox: "0 0 71 18"
          }}
          >
          <g>
            {/*
            <polygon id="readyForIngest" fill={isReadyForIngest ? "#F9B01D" : "#ddd"} points="0 11.0014686 5 11 5 18 0 18"></polygon>
            <polygon id="readyForService" fill={isReadyForService ? "#8DCB4F" : "#ddd"} points="6.65963179 4.96685169 11.6596318 4.96412434 11.6596318 17.9641243 6.65963179 17.9641243"></polygon>
            <polygon id="searchOptimized" fill={isSearchOptimized ? "#6FA7EA" : "#ddd"} points="13 0.00377633473 18 0 18 18 13 18"></polygon>
          */}
            <circle id="readyForIngest"  fill={isReadyForIngest ? "#F54E02" : "transparent"} cx="8" cy="9" r="5"></circle>
            <circle id="readyForService" fill={isReadyForService ? "#7DCBC4" : "transparent"} cx="35" cy="9" r="5"></circle>
            <circle id="searchOptimized" fill={isSearchOptimized ? "#618393" : "transparent"} cx="62" cy="9" r="5"></circle>
            <circle stroke="#999999" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round" cx="8" cy="9" r="7"></circle>
            <circle stroke="#999999" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round" cx="35" cy="9" r="7"></circle>
            <circle stroke="#999999" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round" cx="62" cy="9" r="7"></circle>
            <path d="M43,9 L54.5,9" stroke="#999999" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"></path>
            <path d="M15,9 L27.5,9" stroke="#999999" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"></path>
          </g>
        </svg>    
      </div>
		)
	}
}