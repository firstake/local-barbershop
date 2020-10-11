import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as API from '../../API';

import {notify} from '../../index';
import UserInfoList from '../UserInfoList';

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {isPending: false};

    this.handleLogoutAllSessions = this.handleLogoutAllSessions.bind(this);
  }

  handleLogoutAllSessions() {
    this.setState({isPending: true});
    API.logoutAllSessions().then((_) => {
      this.setState({isPending: false});
      notify('Successfully logged out from other sessions!');
    }).catch((err) => {
      if (err.status === 401) {
        this.props.userLogout();
        notify('Please authorize!');
      }
      notify(err.statusText || 'Network error!');
    });
  }

  render() {
    const {userData, changeUserInfo} = this.props;
    const {isPending} = this.state;

    return (
      <>
        <h2 className="text-center">Profile info</h2>
        <UserInfoList
          userData={userData}
          changeUserInfo={changeUserInfo}
        />
        <div className="text-center mt-4">
          <button
            className="btn btn-danger"
            style={{display: 'inline-flex', alignItems: 'center'}}
            onClick={this.handleLogoutAllSessions}
            disabled={isPending}
          >
            Logout all other sessions
            {isPending ?
              (<span
                className="spinner-border spinner-border-sm ml-2"
                role="status"
                aria-hidden="true">
              </span>
              ) : null
            }
          </button>
        </div>
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
  }),
  userLogout: PropTypes.func,
};

export default AccountProfile;
