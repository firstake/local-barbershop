import React, { Component } from 'react';
import Navbar from '../../containers/Navbar';

class Header extends Component {
  render() {
    return (
      <header className="bg-light">
        <div className="container">
          <Navbar />
        </div>
      </header>
    );
  }
}

export default Header;
