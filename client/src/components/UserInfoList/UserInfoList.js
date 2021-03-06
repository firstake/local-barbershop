import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserInfoItem from '../UserInfoItem';

class UserInfoList extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges(key, value) {
    const {changeUserInfo} = this.props;
    changeUserInfo(key, value);
  }

  render() {
    const {name, phone, email} = this.props.userData;

    return (
      <ul className="list-group list-group-flush">
        <UserInfoItem
          name="name"
          title="Name"
          text={name}
          type="text"
          autocomplete="name"
          saveChanges={this.saveChanges}
          cssClass="border-top-0"
        />
        <UserInfoItem
          name="phone"
          title="Phone"
          text={phone}
          type="tel"
          autocomplete="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          saveChanges={this.saveChanges}
        />
        <UserInfoItem
          name="email"
          title="Email"
          text={email}
          type="email"
          autocomplete="email"
          saveChanges={this.saveChanges}
        />
        <UserInfoItem
          name="password"
          title="Password"
          text="******"
          type="password"
          autocomplete="new-password"
          minLength="6"
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
  }),
};

export default UserInfoList;
