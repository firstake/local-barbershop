import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import {regFetch, regHasErrored} from '../../actions/registerActions';

import './RegisterForm.scss';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', pass: '', name: '', phone: '', isPassShown: false,
    };

    this.togglePassVisiblity = this.togglePassVisiblity.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  togglePassVisiblity() {
    this.setState((prevState) => ({isPassShown: !prevState.isPassShown}));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {email, pass, name, phone} = this.state;
    this.props.fetchRegUser(
        email,
        pass,
        name,
        phone,
    );
  }

  componentWillUnmount() {
    this.props.cancelRegError();
  }

  handleInputChange(evt) {
    const {value, name} = evt.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {isAuth, regError, isPending} = this.props;
    const {isPassShown} = this.state;

    if (isAuth) return <Redirect to="/account" />;

    const errorMessage = regError.hasErrored && (
      <div className="alert alert-danger d-flex justify-content-center p-1">
        <small>{ regError.errorText }</small>
      </div>
    );

    return (
      <div className="registration-form-wrapper">
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={isPending}>

            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                onChange={this.handleInputChange}
                name="name"
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                autoComplete="name"
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                onChange={this.handleInputChange}
                name="phone"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="form-control"
                id="phone"
                placeholder="777-444-3311"
                autoComplete="tel"
                required
              />
            </div>

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
                required
              />
              <small className="form-text text-muted">
                Don&apos;t be scary, we&apos;ll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  onChange={this.handleInputChange}
                  name="pass"
                  type={isPassShown ? 'text' : 'password'}
                  minLength="6"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={this.togglePassVisiblity}
                  disabled={isPending}
                >
                  <FontAwesomeIcon icon={isPassShown ? faEye : faEyeSlash} />
                </button>
              </div>
              <small className="form-text text-muted">
                We hope you come up with something.
              </small>
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
      </div>
    );
  }
}

RegisterForm.propTypes = {
  cancelRegError: PropTypes.func,
  fetchRegUser: PropTypes.func,
  isAuth: PropTypes.bool,
  isPending: PropTypes.bool,
  regError: PropTypes.shape({
    hasErrored: PropTypes.bool,
    errorText: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  regError: state.regHasErrored,
  isPending: state.authSuccess.authIsPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRegUser: (email, pass, name, phone) => dispatch(regFetch(email, pass, name, phone)),
  cancelRegError: () => dispatch(regHasErrored(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
