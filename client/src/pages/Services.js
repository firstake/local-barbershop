import React, {Component} from 'react';
import ScrollToTopOnMount from '../util/ScrollToTopOnMount';

import ServicesCardDeck from '../components/ServicesCardDeck';

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
