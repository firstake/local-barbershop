import React, { Component } from 'react';
import AccountContent from '../containers/accountContent/accountContent';

class Account extends Component {
  render() {
    return (
      <div className="container py-4 f-h">
        <h1 className="text-center border-bottom pb-2">My account</h1>
        <AccountContent />
      </div>
    );
  }
}

export default Account;
