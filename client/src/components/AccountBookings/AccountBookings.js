import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarWeek} from '@fortawesome/free-solid-svg-icons';

import {formatDate} from '../../util';

class AccountBookings extends Component {
  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  cancelBooking(evt) {
    const [date, time] = evt.target.dataset.key.split(' ');
    this.props.cancel(date, time);
  }

  render() {
    const {bookings} = this.props;

    return (
      <>
        <h2 className="text-center">Upcoming bookings</h2>
        {!bookings.length ? (
          <div className="alert alert-warning text-center py-1">
            <span>Nothing here... Would you like to </span>
            <Link to="/services" className="alert-link">
              book something?
            </Link>
          </div>
        ) : (
          <div className="list-group">
            {bookings
                .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
                .map(({
                  date, time, title, link,
                }) => (
                  <div className="list-group-item" key={`${date} ${time}`}>
                    <h5 className="mb-1 d-block">
                      <Link to={`services/${link}`} className="text-secondary">
                        {title}
                      </Link>
                    </h5>
                    <p className="mb-1">
                      <FontAwesomeIcon icon={faCalendarWeek}/>
                      {` ${formatDate(date)} `}
                      <span style={{color: '#dc3545'}}>|</span>
                      {` ${time}`}
                    </p>
                    <button
                      type="button"
                      onClick={this.cancelBooking}
                      data-key={`${date} ${time}`}
                      className="btn btn-danger float-right mt-1"
                    >
                    Cancel
                    </button>
                  </div>
                ))}
          </div>
        )}
      </>
    );
  }
}

AccountBookings.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object),
  cancel: PropTypes.func,
};

export default AccountBookings;
