import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchCancelBooking} from '../../actions/bookingActions';
import {
  fetchChangeUserInfo,
  fetchChangeUserAvatar,
} from '../../actions/userActions';

import Avatar from '../../components/Avatar';
import AccountBookings from '../../components/AccountBookings';
import AccountProfile from '../../components/AccountProfile';
import Tabs from '../../components/Tabs';

const buttonLabels = [
  'Bookings',
  'Profile',
];

class AccountContent extends Component {
  constructor(props) {
    super(props);

    this.state = {active: 0};
    this.openTab = this.openTab.bind(this);
  }

  openTab(evt) {
    this.setState({active: +evt.target.dataset.index});
  }

  render() {
    const {
      isAuth, userData, changeUserInfo, cancelBooking, changeUserAvatar,
    } = this.props;
    const {active} = this.state;

    if (!isAuth) return <Redirect to="/sign-in" />;

    return (
      <div className="row pt-3">
        <div className="col-md-3">
          <div className="row position-relative">
            <div className="col-4 col-md-12 pr-0 pr-sm-3">
              <Avatar
                avatar={userData.avatar}
                changeUserAvatar={changeUserAvatar}
              />
            </div>
            <div className="col-8 col-md-12 px-3 mb-4">
              <div className="list-group">
                {buttonLabels.map((label, i) => (
                  <button
                    onClick={this.openTab}
                    data-index={i}
                    key={label}
                    className={
                      `list-group-item list-group-item-action py-2${
                        i === active ? ' active' : ''}`
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 mr-auto ml-auto">
          <Tabs active={active}>
            <AccountBookings
              bookings={userData.bookings}
              cancel={cancelBooking}
            />
            <AccountProfile
              userData={userData}
              changeUserInfo={changeUserInfo}
            />
          </Tabs>
        </div>
      </div>
    );
  }
}

AccountContent.propTypes = {
  isAuth: PropTypes.bool,
  cancelBooking: PropTypes.func,
  changeUserInfo: PropTypes.func,
  changeUserAvatar: PropTypes.func,
  userData: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  userData: state.authSuccess.userData,
});

const mapDispatchToProps = (dispatch) => ({
  cancelBooking: (date, time) => dispatch(fetchCancelBooking(date, time)),
  changeUserInfo: (name, value) => dispatch(fetchChangeUserInfo(name, value)),
  changeUserAvatar: (formData) => dispatch(fetchChangeUserAvatar(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);
