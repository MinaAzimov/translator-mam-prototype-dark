import React, { Component, PropTypes } from 'react';
import Transition from 'react-overlays/lib/Transition';
import $ from "jquery";

export class SlideIn extends React.Component {
  static defaultProps = {

  }

  onExit = () => {
    $(".modal-push-out").last().removeClass("modal-push-out");
  }

  onEnter = () => {
    const $fadeModals = $(".modal-fade-in");
    if ($fadeModals.length > 2) {
      const $lastOpenModal = $fadeModals.eq($fadeModals.length - 3).parent();
      $lastOpenModal.addClass("modal-push-out");
    }
  }



  render() {
    return (
      <Transition
        {...this.props}
        className={'modal-fade-in'}
        enteredClassName="in"
        enteringClassName="in"
        timeout={450}
        onExit={this.onExit}
        onEnter={this.onEnter}

      />
    );
  }
}


