import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class MediaLicensePrompt extends Component {
  static propTypes = {
    header: PropTypes.any,
    children: PropTypes.any,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    show: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    submitDisable: PropTypes.bool
  };

  static defaultProps = {
    onCancel: () => {},
    onSubmit: () => {},
    submitText: 'Ok',
    cancelText: 'Cancel',
    header: null,
    children: null,
  };

  render() {
    const isOkDisabledProps = this.props.submitDisable ? {disabled: 'disabled'} : {};
    const dialogClassname = "modal--prompt media-overlay--show" + ((this.props.className) ? " " + this.props.className : "");
    return (<Modal
      show={this.props.show}
      onHide={this.props.onCancel}
      dialogClassName={dialogClassname}
      className="prompt"
      keyboard={true}
    >
      <Modal.Header>
        {this.props.header}
        <button type="button" onClick={this.props.onCancel} className="close prompt-close" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        {this.props.children}
        <div className="modal__controls">
          {this.props.submitText && <button className="task-creator__submit"  {...isOkDisabledProps} onClick={this.props.onSubmit}>
            {this.props.submitText}
          </button>
          }
          {this.props.cancelText && <button className="task-creator__cancel" onClick={this.props.onCancel}>
            {this.props.cancelText}
          </button>
          }
        </div>
      </Modal.Body>
    </Modal>)
  }
}
