import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as API from '../../API';

import ServiceBookingPanel from '../../containers/ServiceBookingPanel';

import './CardPage.css';

class cardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: null,
      isError: false,
    };
  }

  componentDidMount() {
    const link = this.props.match.params.title || '';

    API.getService(link).then((data) => {
      if (data.err) {
        this.setState({isError: true});
      } else {
        this.setState({pageData: data});
      }
    });
  }

  render() {
    const {isError, pageData} = this.state;
    const {match} = this.props;

    if (isError) {
      return <Redirect to="/404" />;
    }

    if (!pageData) {
      return (
        <div className="d-flex justify-content-center align-items-center f-h">
          <div className="spinner-border text-warning " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    const {img, title, full_desc, price, time} = pageData;

    return (
      <div className="container f-h py-4 card-page">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <div className="img-loading-wrapper">
                <picture>
                  <source srcSet={`${img}.webp`} type="image/webp" />
                  <source srcSet={`${img}.jpg`} type="image/jpeg" />
                  <img
                    className="card-img"
                    src={`${img}.jpg`}
                    width="1024"
                    height="683"
                    alt={title}
                  />
                </picture>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body d-flex flex-column">
                <h1 className="card-title">{title}</h1>
                <p className="card-text text-muted">
                  {full_desc}
                </p>
                <p className="card-text text-right m-0 mt-auto">
                  Price: ${price}
                </p>
                <p className="card-text text-right">
                  Duration: {time} min
                </p>
              </div>
            </div>
          </div>
        </div>

        <ServiceBookingPanel
          title={title}
          link={match.params.title}
        />
      </div>
    );
  }
}

cardPage.propTypes = {
  match: PropTypes.object,
};

export default cardPage;
