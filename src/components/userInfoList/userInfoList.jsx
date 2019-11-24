import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfoItem from '../userInfoItem/userInfoItem';

class UserInfoList extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges(name, value) {
    this.props.changeUserInfo(name, value, this.props.userData.token);
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        <UserInfoItem
          name="name"
          title="Name"
          text={this.props.userData.name}
          type="text"
          saveChanges={this.saveChanges}
          cssClass="border-top-0"
        />
        <UserInfoItem
          name="phone"
          title="Phone"
          text={this.props.userData.phone}
          type="tel"
          saveChanges={this.saveChanges}
        />
        <UserInfoItem
          name="email"
          title="Email"
          text={this.props.userData.email}
          type="email"
          saveChanges={this.saveChanges}
        />
        <UserInfoItem
          name="password"
          title="Password"
          text="******"
          type="password"
          saveChanges={this.saveChanges}
          cssClass="border-bottom"
        />
      </ul>
    );
  }
}

UserInfoList.propTypes = {
  changeUserInfo: PropTypes.func,
  userData: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    token: PropTypes.number,
  }),
};

export default UserInfoList;
