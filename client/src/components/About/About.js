import React, {Component} from 'react';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 text-center p-4 about-content">
            <div className="about-content__text">
              <h2>We are locals</h2>
              <p>
                From day one, we wanted to create a barbershop that delivered
                the best service out there, and consistently so. We were
                frustrated with haircuts and customer service that were often
                hit-and-miss, and were determined to do better.
              </p>
              <p>
                That meant building the best teams and training them to our
                standard. It meant creating beautiful, stylish, relaxing spaces.
                But most of all it meant listening to our customers.
              </p>
              <p className="mb-0">
                We’re proud of our teams, our community. And we’re proud that we
                give people confidence – inside and out.
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-6 p-0">
            <div className="about-pic" />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
