import React, { Component } from 'react';

import Banner from '../components/banner/banner';
import PopServices from '../components/popServices/popServices';
import About from '../components/about/about';

class Home extends Component {
  render() {
    return (
      <>
        <Banner />
        <PopServices />
        <About />
      </>
    );
  }
}

export default Home;
