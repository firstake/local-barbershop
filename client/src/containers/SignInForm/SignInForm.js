import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {authFetch, authHasErrored} from '../../actions/authActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', pass: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(evt) {
    const {value, name} = evt.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {email, pass} = this.state;
    const {fetchUserAuth} = this.props;

    fetchUserAuth(email, pass);
  }

  componentWillUnmount() {
    const {cancelAuthError} = this.props;
    cancelAuthError();
  }

  render() {
    const {isAuth, authError} = this.props;

    if (isAuth) return <Redirect to="/account" />;

    const errorMessage = authError.hasErrored && (
      <div className="alert alert-danger d-flex justify-content-center p-1">
        <small>{ authError.errorText }</small>
      </div>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={this.handleInputChange}
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            autoComplete="email"
            autoFocus
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleInputChange}
            name="pass"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-general text-white">
            Submit
          </button>
        </div>

        <p className="pt-4">
          Don&apos;t have an account? Register
          {' '}
          <Link to="/register" className="text-warning">
            here.
          </Link>
        </p>
      </form>
    );
  }
}

SignInForm.propTypes = {
  authError: PropTypes.shape({
    hasErrored: PropTypes.bool,
    errorText: PropTypes.string,
  }),
  isAuth: PropTypes.bool,
  cancelAuthError: PropTypes.func,
  fetchUserAuth: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  authError: state.authHasErrored,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserAuth: (email, pass) => dispatch(authFetch(email, pass)),
  cancelAuthError: () => dispatch(authHasErrored(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
