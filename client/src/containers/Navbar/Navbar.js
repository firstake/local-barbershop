import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchUserLogout} from '../../actions/logoutActions';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggleClass = this.toggleClass.bind(this);
    this.menuHandleClick = this.menuHandleClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(evt) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(evt.target) &&
      window.innerWidth < 768
    ) {
      this.setState({
        isOpen: false,
      });
    }
  }

  toggleClass() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  menuHandleClick(evt) {
    const {tagName} = evt.target;
    if ((tagName === 'A' || tagName === 'BUTTON') && window.innerWidth < 768) {
      this.toggleClass();
    }
  }

  logout() {
    this.props.fetchUserLogout();
  }

  render() {
    const {isAuth, isLoggingOut} = this.props;
    const {isOpen} = this.state;

    return (
      <nav
        ref={this.setWrapperRef}
        className="navbar navbar-expand-md navbar-light"
      >
        <NavLink exact to="/" className="navbar-brand">
          <img src="/logo.png" width="36" height="36" alt="logo" />
        </NavLink>

        <button
          type="button"
          className="navbar-toggler"
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
            `collapse navbar-collapse${isOpen ? ' show' : ''}`
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
                <button
                  type="button"
                  className={`nav-link btn-logout${isLoggingOut ? ' btn-logout-fetching' : ''}`}
                  disabled={isLoggingOut}
                  onClick={this.logout}
                >
                  Logout
                  {isLoggingOut ? <div className="ellipsis-loader"></div> : null}
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
  isLoggingOut: PropTypes.bool,
  fetchUserLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  isLoggingOut: state.authSuccess.logoutIsPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserLogout: () => dispatch(fetchUserLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Navbar);
