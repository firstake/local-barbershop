import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './PopularServices.css';

const popularServicesData = [
  {
    title: 'Haircut',
    price: 35,
    link: 'haircut',
  },
  {
    title: 'Edge Up',
    price: 10,
    link: 'edgeup',
  },
  {
    title: 'Shampoo',
    price: 4,
    link: 'shampoo',
  },
  {
    title: 'Straight Razor Shave',
    price: 35,
    link: 'razor',
  },
];

class PopularServices extends Component {
  render() {
    return (
      <div className="container-fluid bg-light p-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h2 className="text-center">Popular services</h2>
              <p className="text-center">
                We create simple and cool men&apos;s hairstyles.
                <br />
                Learn more about our services.
              </p>
              <ul className="popular-services list-group list-group-flush shadow">
                {popularServicesData.map(({title, price, link}) => (
                  <li className="list-group-item" key={link}>
                    <Link to={`/services/${link}`} className="text-dark">
                      {title}
                    </Link>
                    <span className="badge badge-secondary float-right">
                      $
                      {price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  to="/services"
                  className="btn btn-general text-white mt-4"
                >
                  More services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularServices;
