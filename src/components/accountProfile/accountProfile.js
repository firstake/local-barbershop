import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfoList from '../userInfoList/userInfoList';

class AccountProfile extends Component {
  render() {
    const { userData, changeUserInfo } = this.props;

    return (
      <>
        <h2 className="text-center">Profile info</h2>
        <UserInfoList
          userData={userData}
          changeUserInfo={changeUserInfo}
        />
      </>
    );
  }
}

AccountProfile.propTypes = {
  changeUserInfo: PropTypes.func,
  userData: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    token: PropTypes.number,
  }),
};

export default AccountProfile;
