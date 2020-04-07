import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <p
          className="bg-light
          text-center
          p-4
          m-0"
        >
          { `${new Date().getFullYear()} | Local Barbershop` }
        </p>
      </footer>
    );
  }
}

export default Footer;
