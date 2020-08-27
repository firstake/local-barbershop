import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {authFetch, authHasErrored} from '../../actions/authActions';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', pass: '', isPassShown: false};

    this.togglePassVisiblity = this.togglePassVisiblity.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePassVisiblity() {
    this.setState((prevState) => ({isPassShown: !prevState.isPassShown}));
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
    localStorage.removeItem('cardLocation');

    const {cancelAuthError} = this.props;
    cancelAuthError();
  }

  render() {
    const {isAuth, authError, isPending} = this.props;
    const {isPassShown} = this.state;

    const cardLocation = localStorage.getItem('cardLocation');

    if (isAuth && cardLocation) {
      return <Redirect to={cardLocation} />;
    }

    if (isAuth) return <Redirect to="/account" />;

    const errorMessage = authError.hasErrored && (
      <div className="alert alert-danger d-flex justify-content-center p-1">
        <small>{ authError.errorText }</small>
      </div>
    );

    return (
      <div>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={isPending}>

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
              <div className="password-wrapper">
                <input
                  onChange={this.handleInputChange}
                  name="pass"
                  type={isPassShown ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={this.togglePassVisiblity}
                >
                  <FontAwesomeIcon icon={isPassShown ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="
              btn btn-general
              d-flex justify-content-center align-items-center mx-auto
              text-white"
            >
              Submit
              {isPending ?
                (<span
                  className="spinner-border spinner-border-sm ml-2"
                  role="status"
                  aria-hidden="true">
                </span>
                ) : null
              }
            </button>

          </fieldset>
        </form>
        <p className="pt-4">
          Don&apos;t have an account? Register
          {' '}
          <Link to="/register" className="text-warning">
            here.
          </Link>
        </p>
      </div>
    );
  }
}

SignInForm.propTypes = {
  authError: PropTypes.shape({
    hasErrored: PropTypes.bool,
    errorText: PropTypes.string,
  }),
  isAuth: PropTypes.bool,
  isPending: PropTypes.bool,
  cancelAuthError: PropTypes.func,
  fetchUserAuth: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  authError: state.authHasErrored,
  isPending: state.authSuccess.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserAuth: (email, pass) => dispatch(authFetch(email, pass)),
  cancelAuthError: () => dispatch(authHasErrored(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
