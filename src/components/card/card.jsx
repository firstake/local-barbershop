import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.css';

class Card extends Component {
  render() {
    return (
      <div className="card mb-4">
        <img
          src={this.props.data.img}
          className="card-img-top"
          alt={this.props.data.title}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.data.title}</h5>
          <p className="card-text text-muted">{this.props.data.description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Link
            to={`services/${this.props.data.link}`}
            className="btn btn-general text-white"
          >
            Details
          </Link>
          <div>
            <span>
              ${this.props.data.price}
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
