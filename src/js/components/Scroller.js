import React, { Component, PropTypes } from 'react';
import $ from "jquery";

export default class Scroller extends Component {

	static defaultProps = {
		onScroll: ()=>{},
		onHitTop: ()=>{},
		onHitEnd: ()=>{},
		scrollTop: 0,
		animate: true,
		height: "500px",
		scrollToOffset: 50
	}

	constructor(props) {
		super(props);
		this.state = {
			isAnimating: false,
			isAtTop: true,
			isAtEnd: false
		}
	}

	componentDidMount() {
		this.scrollEl.addEventListener("scroll", this.onScroll);
	}

	componentWillUnmount() {
		this.scrollEl.removeEventListener("scroll", this.onScroll);
	}



	onScroll = (e) => {
		let scrollTop = this.scrollEl.scrollTop;
		let contentHeight = this.contentEl.offsetHeight;
		
		let {isAtTop, isAtEnd} = this.state;
		this.currScrollTop = scrollTop;
		this.props.onScroll(scrollTop);

		console.log(contentHeight + this.props.height);

		if (scrollTop + this.props.height >= contentHeight) {
			this.setState({
				isAtTop: false,
				isAtEnd: true
			})
		}
		else if (scrollTop <= 0) {
			this.setState({
				isAtTop: true,
				isAtEnd: false
			})
		}
		else if (isAtTop || isAtEnd) {
			this.setState({
				isAtTop: false,
				isAtEnd: false
			})
		}

	}

	componentDidUpdate(prevProps) {
		if (prevProps.scrollTo !== this.props.scrollTo) {
			$(this.scrollEl).stop().animate({
				scrollTop: this.props.scrollTo - this.props.scrollToOffset
			})
		}
	}


	render() {

		let {isAtTop, isAtEnd} = this.state;

		let containerStyles = {
			position: "relative"
		}

		let scrollStyles = {
			position: "relative",
			overflow: "auto",
			height: this.props.height,
			"-ms-overflow-style": "none"
		}

		return (
			<div style={containerStyles}>
				<div style={scrollStyles} ref={(el)=>{this.scrollEl = el}}>
					<div ref={(el)=>{this.contentEl = el}}>
						{this.props.children}
					</div>
				</div>
				{ !isAtTop ?
						<div className="scroller-top-more">
						</div>
					:
						null
				}
				{
					!isAtEnd ?
						<div className="scroller-bottom-more">
						</div>
					:
						null
				}

			</div>
		)


	}


}