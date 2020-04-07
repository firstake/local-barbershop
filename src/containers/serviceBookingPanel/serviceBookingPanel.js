import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  fetchCancelBooking,
  fetchNewBooking,
} from '../../actions/userAuthAction';

import ServiceBookingPanelButtons from './serviceBookingPanelButtons';
import ServiceBookingPanelBookings from './serviceBookingPanelBookings';
import ServiceBookingPanelUserForm from './serviceBookingPanelUserForm';
import ServiceBookingPanelGuestForm from './serviceBookingPanelGuestForm';

import ModalWindow from '../../components/ModalWindow';

class ServiceBookingPanel extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  showModal() {
    this.setState({ isOpen: true });
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ isOpen: false });
  }

  render() {
    const {
      isAuth, userData, link, title, fetchNewBooking, cancelBooking,
    } = this.props;
    const { isOpen } = this.state;

    let filteredBookings = [];

    if (isAuth) {
      filteredBookings = userData.bookings.filter(
        (booking) => booking.link === link,
      );
    }

    const sortedBookings = filteredBookings.sort(
      (a, b) => (a.date + a.time).localeCompare(b.date + b.time),
    );

    return (
      <>
        <ServiceBookingPanelButtons
          isAuth={isAuth}
          bookingsLength={sortedBookings.length}
          showModal={this.showModal}
        />

        <ModalWindow
          isOpen={isOpen}
        >
          {isAuth ? (
            <ServiceBookingPanelUserForm
              newBooking={fetchNewBooking}
              title={title}
              link={link}
              token={userData.token}
              onCancel={this.handleCancel}
            />
          ) : (
            <ServiceBookingPanelGuestForm
              onCancel={this.handleCancel}
            />
          )}
        </ModalWindow>

        {isAuth && (
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              {sortedBookings.length !== 0 && (
                <ServiceBookingPanelBookings
                  bookings={sortedBookings}
                  cancelBooking={cancelBooking}
                  token={userData.token}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

ServiceBookingPanel.propTypes = {
  cancelBooking: PropTypes.func,
  fetchNewBooking: PropTypes.func,
  isAuth: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
  userData: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    token: PropTypes.number,
  }),
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  userData: state.authSuccess.userData,
});

const mapDispatchToProps = (dispatch) => ({
  cancelBooking: (date, time, token) => dispatch(fetchCancelBooking(date, time, token)),
  fetchNewBooking: (date, time, title, link, token) => dispatch(fetchNewBooking(date, time, title, link, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceBookingPanel);
