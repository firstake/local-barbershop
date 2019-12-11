import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ServiceBookingPanel from '../containers/serviceBookingPanel/serviceBookingPanel';

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
    const home = document.location.origin;

    fetch(`${home}/api/services?page=${link}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          this.setState({ isError: true });
        } else {
          this.setState({ pageData: data });
        }
      });
  }

  render() {
    const { isError, pageData } = this.state;
    const { match } = this.props;

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

    return (
      <div className="container f-h py-4">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <img
                src={pageData.img}
                className="card-img"
                alt={pageData.title}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h1 className="card-title">{pageData.title}</h1>
                <p className="card-text text-muted">
                  {pageData.full_desc}
                </p>
                <p className="card-text text-right m-0">
                  Price: $
                  {pageData.price}
                </p>
                <p className="card-text text-right">
                  Duration:
                  {' '}
                  {pageData.time}
                  {' '}
                  min
                </p>
              </div>
            </div>
          </div>
        </div>

        <ServiceBookingPanel
          title={pageData.title}
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
