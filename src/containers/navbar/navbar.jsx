import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './navbar.css';

import { connect } from 'react-redux';
import { load, clear } from 'redux-localstorage-simple';
import { authSuccess, userLogout } from '../../actions/userAuthAction';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.toggleClass = this.toggleClass.bind(this);
    this.menuHandleClick = this.menuHandleClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    const store = load({
      states: ['authSuccess.userData'],
      namespace: 'app',
      preloadedState: null,
    });

    if (store) {
      this.props.restoreSession(true, store.authSuccess.userData);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (
      this.wrapperRef
      && !this.wrapperRef.contains(e.target)
      && window.screen.width < 768
    ) {
      this.setState({
        active: false,
      });
    }
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  menuHandleClick(e) {
    if ((e.target.tagName === 'A' || e.target.tagName === 'BUTTON') && window.screen.width < 768) {
      this.toggleClass();
    }
  }

  logout() {
    this.props.userLogout();
    clear();
  }

  render() {
    const { isAuth } = this.props;
    const { active } = this.state;

    return (
      <nav
        ref={this.setWrapperRef}
        className="navbar navbar-expand-md navbar-light"
      >
        <a className="navbar-brand" href="/">
          <img src="/logo.svg" width="36" height="36" alt="logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggleClass}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={
            `collapse navbar-collapse${active ? ' show' : ''}`
          }
          onClick={this.menuHandleClick}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/gallery" className="nav-link">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacts" className="nav-link">
                Contacts
              </NavLink>
            </li>
          </ul>

          <div className="dropdown-divider" />

          <ul className="navbar-nav w-100 justify-content-end">
            <li className="nav-item">
              <NavLink
                to={isAuth ? '/account' : '/sign-in'}
                className="nav-link"
              >
                {isAuth ? 'Account' : 'Sign in'}
              </NavLink>
            </li>
            <li className="nav-item">
              {isAuth ? (
                <button className="nav-link btn-logout" onClick={this.logout}>
                  Logout
                </button>
              ) : (
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  restoreSession: PropTypes.func,
  userLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
  restoreSession: (bool, userData) => dispatch(authSuccess(bool, userData)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Navbar);
