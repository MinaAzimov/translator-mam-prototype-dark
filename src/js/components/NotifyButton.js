import React, { Component, PropTypes } from 'react';
import { EMAILS } from '../../../mock/emails.js';
import { WithOutContext as ReactTags } from 'react-tag-input';
import classNames from "classnames";


export default class NotifyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifyOptionsShow: false, 
      placeholder: "usa.pa@nbcuni.com",
      tags: [],
      // tags: [
      //   { id: 1, text: "enews.pa@nbcuni.com" }, 
      //   { id: 2, text: "enews.pa-team@nbcuni.com" }
      // ],
      suggestions: EMAILS,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.openNotifyOptions = this.openNotifyOptions.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if(!this.refs.wrapper.contains(event.target)) {
      this.setState({
        notifyOptionsShow: false
      });
      if (this.props.drawer != null) {
        this.setState({
          tags: []
        });
        this.refs.notifyToggle.checked = false;
      }
    }
  }

  handleDelete(i) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    let { tags } = this.state;
    this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] });
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags });
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
    this.setState({
      notifyOptionsShow: false
    });
  }

  openNotifyOptions() {
    this.setState({
      notifyOptionsShow: true
    });
  }

  onSubmit() {
    this.setState({
      placeholder: "Sent Successfully.",
      tags: [],
      notifyOptionsShow: false,
      sendSuccess: true
    });
    setTimeout(()=>{
      this.setState({
        placeholder: "usa.pa@nbcuni.com",
        sendSuccess: false
      });
    }, 5000);
  }

  render() {
    const { placeholder, tags, suggestions } = this.state;
    const { drawer } = this.props;

    const classnames = classNames({
      "notify-button": true,
      "notify-button--show-options": this.state.notifyOptionsShow,
      "notify-button--send-success": this.state.sendSuccess,
      "notify-button--drawer": drawer
    })

    return (
      <div className={classnames} ref="wrapper">
        <span>Notify By Email</span>
        <input id="notify-toggle" type="checkbox" ref="notifyToggle"></input>
        <label htmlFor="notify-toggle">
          <i className="iconcss icon-bullhorn"></i>
          <span>Email Notify</span>
        </label>

        <ReactTags
          placeholder={(tags.length > 0) ? '' : placeholder}
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          removeComponent={RemoveComponent}
        />
        <button disabled={this.state.tags.length == 0} onClick={this.openNotifyOptions}><i className="iconcss icon-bullhorn"></i>
        </button>
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
        <ul className="notify-options">
          <li><a onClick={this.onSubmit}><i className="iconcss icon-bullhorn"></i>Notify {this.state.tags.length} {this.state.tags.length == 1 ? 'Email' : 'Emails'} Now?</a></li>
        </ul>
      </div>
    );
  }
}

class RemoveComponent extends Component {
   render() {
      return (
         <i {...this.props} className="iconcss icon-close"></i>
      )
   }
}