import React, { Component } from 'react';
import SignInForm from '../containers/SignInForm';

class SignIn extends Component {
  render() {
    return (
      <div className="container py-4 f-h">
        <h1 className="text-center mt-4">Sign in</h1>
        <div className="d-flex justify-content-center">
          <SignInForm />
        </div>
      </div>
    );
  }
}

export default SignIn;
