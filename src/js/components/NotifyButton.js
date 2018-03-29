import React, { Component, PropTypes } from 'react';
import { EMAILS } from '../../../mock/emails.js';
import { WithOutContext as ReactTags } from 'react-tag-input';
import classNames from "classnames";


export default class NotifyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifyOptionsShow: false, 
      placeholder: "Notify By Email",
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
      placeholder: "Success!",
      tags: [],
      notifyOptionsShow: false
    });
    setTimeout(()=>{
      this.setState({
        placeholder: "Notify By Email",
      });
    }, 3600);
  }

  render() {
    const { placeholder, tags, suggestions } = this.state;

    const notifyOptionsClassNames = classNames({
      "notify-options": true,
      "notify-options--show": this.state.notifyOptionsShow
    })

    return (
      <div className="notify-button" ref="wrapper">
        <ReactTags
          placeholder={placeholder}
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          removeComponent={RemoveComponent}
        />
        <button onClick={this.openNotifyOptions}><i className="iconcss icon-bullhorn"></i></button>
        <ul className={notifyOptionsClassNames}>
          <li><a onClick={this.onSubmit}><i className="iconcss icon-bullhorn"></i>Notify Now</a></li>
          <li><a onClick={this.onSubmit}><img src="/assets/img/icons/ready-for-ingest.svg"/><span>When Ready for Ingest</span></a></li>
          <li><a onClick={this.onSubmit}><img src="/assets/img/icons/ready-for-service.svg"/><span>When Ready for Service</span></a></li>
          <li><a onClick={this.onSubmit}><img src="/assets/img/icons/search-optimized.svg"/><span>When Search Optimized</span></a></li>
        </ul>
        <div className="scheduled-dots">
          <span className="scheduled-dot scheduled-dot--ingest"></span>
          <span className="scheduled-dot scheduled-dot--service"></span>
          <span className="scheduled-dot scheduled-dot--optimized"></span>
        </div>
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