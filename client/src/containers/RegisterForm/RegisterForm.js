import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {regFetch, regHasErrored} from '../../actions/registerActions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', pass: '', name: '', phone: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const {isAuth, regError} = this.props;

    if (isAuth) return <Redirect to="/account" />;

    const errorMessage = regError.hasErrored && (
      <div className="alert alert-danger d-flex justify-content-center p-1">
        <small>{ regError.errorText }</small>
      </div>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}

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
          <input
            onChange={this.handleInputChange}
            name="pass"
            type="password"
            minLength="6"
            className="form-control"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <small className="form-text text-muted">
            We hope you come up with something.
          </small>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-general text-white">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  cancelRegError: PropTypes.func,
  fetchRegUser: PropTypes.func,
  isAuth: PropTypes.bool,
  regError: PropTypes.shape({
    hasErrored: PropTypes.bool,
    errorText: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  regError: state.regHasErrored,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRegUser: (email, pass, name, phone) => dispatch(regFetch(email, pass, name, phone)),
  cancelRegError: () => dispatch(regHasErrored(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
