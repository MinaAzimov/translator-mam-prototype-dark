import React, { Component, PropTypes } from 'react';
import socket from "../client/socketClient";
import usersData from '../../../mock/users.json';
import { connect } from 'react-redux';
import $ from "jquery"
import ProfileImg from "./ProfileImg";
import classNames from 'classnames';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isOpen: false,
      numUnread: 0
    }
  }



  onTextChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  send = (e) => {
    e.preventDefault();
    let text = this.state.text;
    if (text.trim() === "") {
      return;
    }
    socket.emit("CHAT_MSG", text, this.props.client.user.id);
    this.setState({
      text: ""
    });
  }

  componentDidMount() {
    $(this.refs.list).animate({
      scrollTop: 2000
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.chat !== prevProps.chat) {
      $(this.refs.list).animate({
        scrollTop: 2000
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    const chat = this.props.chat;
    if (chat !== null && nextProps.chat !== null && chat.length !== nextProps.chat.length ) {
      if (!this.state.isOpen) {
        this.setState({
          numUnread: this.state.numUnread + (nextProps.chat.length - chat.length)
        })
      }
    }
  }


  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      numUnread: 0
    })
  }

  render() {
    let { chat, user, users } = this.props;
    let { numUnread } = this.state;
    let classnames = classNames({
      'chat': true,
      'chat--open': this.state.isOpen
    });

    if (chat === null) {
      chat = [];
    }

    return (
      <div className={classnames}>
        { numUnread > 0 ? <div className="chat-unread">{numUnread}</div> : null }
        <div className="chat-main">
          <div className="chat-toolbar">
            <div className="chat-toolbar__minimize" onClick={this.toggleOpen}>
              <i className="fa fa-window-minimize"></i>
            </div>
          </div>
          <div className="chat-list" ref="list">
            {
              chat.map((message, index)=>{
                let user = usersData.users.find(u => u.id === message.userId);
                return (
                  <div className="chat-item" key={index}>
                    <ProfileImg user={user} />
                    <div className="chat-item__username">
                      {user.name}
                    </div>
                    <div className="chat-item__text">{ message.msg }</div>
                  </div>
                )
              })
            }
          </div>
          <form onSubmit={this.send}>
            <input placeholder="Send chat" value={this.state.text} onChange={this.onTextChange}/>
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="chat-minimized" onClick={this.toggleOpen}>
          <i className="fa fa-comments"></i>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chat: state.chat,
    client: state.client
  }
}

export default connect(mapStateToProps)(Chat);
