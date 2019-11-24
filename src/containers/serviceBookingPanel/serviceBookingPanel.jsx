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

import Modal from '../../components/modal/modal';

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
    let filteredBookings = [];

    if (this.props.isAuth) {
      filteredBookings = this.props.userData.bookings.filter(
        (booking) => booking.link === this.props.link,
      );
    }

    const sortedBookings = filteredBookings.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    return (
      <>
        <ServiceBookingPanelButtons
          isAuth={this.props.isAuth}
          bookingsLength={sortedBookings.length}
          showModal={this.showModal}
        />

        <Modal
          isOpen={this.state.isOpen}
        >
          {this.props.isAuth ? (
            <ServiceBookingPanelUserForm
              newBooking={this.props.fetchNewBooking}
              title={this.props.title}
              link={this.props.link}
              token={this.props.userData.token}
              onCancel={this.handleCancel}
            />
          ) : (
            <ServiceBookingPanelGuestForm
              onCancel={this.handleCancel}
            />
          )}
        </Modal>

        {this.props.isAuth && (
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              {sortedBookings.length !== 0 && (
                <ServiceBookingPanelBookings
                  bookings={sortedBookings}
                  cancelBooking={this.props.cancelBooking}
                  token={this.props.userData.token}
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
