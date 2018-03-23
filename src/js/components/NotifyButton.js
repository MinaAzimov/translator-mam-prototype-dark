import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import { findDOMNode } from "react-dom";

import $ from "jquery";

export default class NotifyButton extends Component {


  callLocalEdit() {
    this.props.editExistingProject();            
  }

  componentDidMount() {

    const notify = findDOMNode(this.refs.notify);
    const form = findDOMNode(this.refs.form);
    const input = findDOMNode(this.refs.input);
    // this.$form = findDOMNode(this.refs.form);
    // this.$label = $(this.label);
    // this.$email = $(this.email);

    // console.log(this.$form);
    // this.$el.chosen();

    // this.handleChange = this.handleChange.bind(this);
    // this.$el.on('change', this.handleChange);


    $(notify).click(function(){
      $(".cta:not(.sent)").addClass("active");
      $("input").focus();
    });

    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $(input).on('input', function(){
      if(regex.test($(this).val())) {
        $("button").removeAttr("disabled"); }
      else {
        $("button").attr("disabled", "disabled"); }
    });

    $(form).submit(function(x){
      x.preventDefault();
      if(regex.test($("input").val())) {
        $(".cta span").text("Thank you!");
        $(".cta").removeClass("active").addClass("sent");
      }
    });

  }


	render() {
    // const { name, subtitle, type, img, editExistingProject, editingLocalProject, readyForIngest, readyForService, searchOptimized } = this.props;
		// const thumbSrc = "/assets/img/icons/video-placeholder.jpg";

    // const iconClassnames = classNames({
    //   'iconcss': true,
    //   'icon-type-video': type == 'video',
    //   'icon-type-image': type == 'image',
    //   'icon-type-audio': type == 'audio'
    // })
		
    return (
      <div className="notify-button">
        <div className="cta">
          <span ref="notify">Notify When Complete</span>
          <form ref="form">
            <div className="input">
              <input ref="input" placeholder="E-mail"></input>
            </div>
            <div className="button">
              <button disabled="disabled" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
		)
	}
}