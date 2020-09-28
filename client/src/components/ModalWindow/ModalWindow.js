import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import Portal from '../Portal';
import './ModalWindow.scss';

class ModalWindow extends Component {
  constructor(props) {
    super(props);

    this.handleEscape = this.handleEscape.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape(evt) {
    if (evt.code === 'Escape') {
      this.props.hideModal();
    }
  }

  render() {
    const {isOpen, hideModal, children} = this.props;

    return (
      <>
        {isOpen &&
          (
            <Portal>
              <div className="modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <button
                  type="button"
                  className="btn close"
                  aria-label="Close"
                  onClick={hideModal}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                  />
                </button>
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">New booking</h3>
                    </div>
                    <div className="modal-body">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </Portal>
          )}
      </>
    );
  }
}

ModalWindow.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  children: PropTypes.node,
};

export default ModalWindow;
