import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Card.css';

class Card extends Component {
  render() {
    const {
      img, title, description, link, price,
    } = this.props.data;

    return (
      <div className="card mb-4">
        <img
          src={img}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Link
            to={`services/${link}`}
            className="btn btn-general text-white"
          >
            Details
          </Link>
          <div>
            <span>
              ${price}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default Card;
