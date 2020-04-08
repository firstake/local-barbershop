import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class AccountBookings extends Component {
  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  cancelBooking(e) {
    const dateTimeArr = e.target.dataset.key.split(' ');
    const [date, time] = dateTimeArr;
    this.props.cancel(date, time, this.props.token);
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
                    <p className="mb-1">{`${date} ${time}`}</p>
                    <button
                      onClick={this.cancelBooking}
                      data-key={`${date} ${time}`}
                      className="btn btn-danger float-right m-1"
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
  token: PropTypes.number,
};

export default AccountBookings;
