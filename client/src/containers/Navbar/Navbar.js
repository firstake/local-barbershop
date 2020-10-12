import io from 'socket.io-client';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchUserLogout, userLogout} from '../../actions/logoutActions';

import './Navbar.scss';
import logo from '../../assets/logo.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.socket = io({
      autoConnect: false,
    });
    this.state = {
      isOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuHandleClick = this.menuHandleClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);

    this.socket.open();
    this.socket.on('logout', () => {
      this.props.userLogout();
      this.socket.close();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggingOut && !this.props.isLoggingOut) {
      this.closeMenu();
    }

    const isAuthStatusChanges = prevProps.isAuth !== this.props.isAuth;

    /*
     * If user is logged in, we should close the previous connection
     * that we opened above, and open a new one. This way WS will receive session UID.
     */
    if (isAuthStatusChanges && this.props.isAuth) {
      this.socket.close();
      this.socket.open();
    }

    if (isAuthStatusChanges && !this.props.isAuth) {
      this.socket.emit('logout');
    }
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
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  closeMenu() {
    this.setState({
      isOpen: false,
    });
  }

  menuHandleClick(evt) {
    const {tagName} = evt.target;
    if ((tagName === 'A') && window.innerWidth < 768) {
      this.closeMenu();
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
        <NavLink
          exact to="/"
          className="navbar-brand"
          onClick={() => {
            if (isOpen) {
              this.closeMenu();
            }
          }}
        >
          <img src={logo} width="36" height="36" alt="logo" />
        </NavLink>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggleMenu}
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
  userLogout: PropTypes.func,
  fetchUserLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuth: state.authSuccess.isAuth,
  isLoggingOut: state.authSuccess.logoutIsPending,
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
  fetchUserLogout: () => dispatch(fetchUserLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Navbar);
