import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class BookingControls extends Component {
  constructor(props) {
    super(props);

    this.toSignIn = this.toSignIn.bind(this);
  }

  toSignIn(evt) {
    evt.preventDefault();

    const {history} = this.props;
    localStorage.setItem('cardLocation', history.location.pathname);
    history.push('/sign-in');
  }

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
          <a
            href="/sign-in"
            onClick={this.toSignIn}
            className="btn btn-general mx-2 mb-3 text-white"
          >
            Sign in and Book
          </a>
        )}
      </div>
    );
  }
}

BookingControls.propTypes = {
  bookingsLength: PropTypes.number,
  showModal: PropTypes.func,
  isAuth: PropTypes.bool,
  history: PropTypes.object,
};

export default withRouter(BookingControls);
