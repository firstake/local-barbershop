import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Portal from '../portal/portal';
import './modal.css';

class Modal extends Component {
  render() {
    const { isOpen, children } = this.props;

    return (
      <>
        {isOpen
          && (
          <Portal>
            <div className="modal" tabIndex="-1" role="dialog" aria-hidden="true">
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

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
