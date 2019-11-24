import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServiceBookingPanelBookings extends Component {
  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  cancelBooking(e) {
    const dateTimeArr = e.target.dataset.key.split(' ');
    this.props.cancelBooking(dateTimeArr[0], dateTimeArr[1], this.props.token);
  }

  render() {
    return (
      <>
        {this.props.bookings.length !== 0 && (
          <>
            <h3>Upcoming bookings</h3>
            <div className="list-group">
              {this.props.bookings.map(({ date, time }) => (
                <div className="list-group-item" key={date + time}>
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
          </>
        )}
      </>
    );
  }
}

ServiceBookingPanelBookings.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object),
  cancelBooking: PropTypes.func,
  token: PropTypes.number,
};

export default ServiceBookingPanelBookings;
