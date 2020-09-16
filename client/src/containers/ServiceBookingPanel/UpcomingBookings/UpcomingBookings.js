import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UpcomingBookings extends Component {
  constructor(props) {
    super(props);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  cancelBooking(evt) {
    const [date, time] = evt.target.dataset.key.split(' ');
    this.props.cancelBooking(date, time);
  }

  render() {
    const {bookings} = this.props;

    return (
      <>
        {bookings.length !== 0 && (
          <>
            <h3>Upcoming bookings</h3>
            <div className="list-group">
              {bookings.map(({date, time}) => (
                <div className="list-group-item" key={date + time}>
                  <p className="mb-1">{`${date} ${time}`}</p>
                  <button
                    type="button"
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

UpcomingBookings.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object),
  cancelBooking: PropTypes.func,
};

export default UpcomingBookings;
