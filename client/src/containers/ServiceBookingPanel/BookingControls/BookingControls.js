import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class BookingControls extends Component {
  render() {
    const {isAuth, showModal} = this.props;

    return (
      <div className="text-right pt-4">
        <button
          className="btn btn-warning text-white mx-2 mb-3"
          onClick={() => {
            showModal();
          }}
        >
          {isAuth ? (
            <>
              {this.props.bookingsLength ? 'Book else' : 'Click to Book'}
            </>
          ) : (
            'Book as Guest'
          )}
        </button>

        {!isAuth && (
          <Link to="/sign-in" className="btn btn-general mx-2 mb-3 text-white">
            Sign in and Book
          </Link>
        )}
      </div>
    );
  }
}

BookingControls.propTypes = {
  bookingsLength: PropTypes.number,
  showModal: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default BookingControls;
