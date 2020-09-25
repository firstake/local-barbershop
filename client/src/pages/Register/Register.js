import React, {Component} from 'react';

import RegisterForm from '../../containers/RegisterForm';

class Register extends Component {
  render() {
    return (
      <div className="container py-4 f-h">
        <h1 className="text-center mt-4">Register</h1>
        <div className="d-flex justify-content-center">
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default Register;
