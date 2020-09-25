import React, {Component} from 'react';

import Navbar from '../../containers/Navbar';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className="position-fixed w-100 bg-light shadow-sm">
        <div className="container">
          <Navbar />
        </div>
      </header>
    );
  }
}

export default Header;
