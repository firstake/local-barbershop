import React, { Component } from 'react';
import ScrollToTopOnMount from '../utils/scrollToTopOnMount';

import ServicesCardDeck from '../components/servicesCardDeck/servicesCardDeck';

class Services extends Component {
  render() {
    return (
      <div className="f-h">
        <ScrollToTopOnMount />
        <div className="container">
          <h1 className="text-center pt-4 pb-2 border-bottom">Services</h1>
        </div>
        <ServicesCardDeck />
      </div>
    );
  }
}

export default Services;
