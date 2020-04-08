import React, {Component} from 'react';
import './Banner.css';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="container text-center text-white">
          <h1 className="m-0">Local Barbershop</h1>
          <p className="mb-4">Since whatever</p>
        </div>
      </div>
    );
  }
}

export default Banner;
