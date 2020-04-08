import React, {Component} from 'react';

import Banner from '../components/Banner';
import PopularServices from '../components/PopularServices';
import About from '../components/About';

class Home extends Component {
  render() {
    return (
      <>
        <Banner />
        <PopularServices />
        <About />
      </>
    );
  }
}

export default Home;
