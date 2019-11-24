import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      .then((data) => this.setState({ pageData: data }))
      .catch(() => this.setState({ isError: true }));
  }

  render() {
    if (this.state.isError) {
      return <Redirect to="/404" />;
    }

    if (!this.state.pageData) {
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
                src={this.state.pageData.img}
                className="card-img"
                alt={this.state.pageData.title}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h1 className="card-title">{this.state.pageData.title}</h1>
                <p className="card-text text-muted">
                  {this.state.pageData.full_desc}
                </p>
                <p className="card-text text-right m-0">
                  Price: $
                  {this.state.pageData.price}
                </p>
                <p className="card-text text-right">
                  Duration:
                  {' '}
                  {this.state.pageData.time}
                  {' '}
                  min
                </p>
              </div>
            </div>
          </div>
        </div>

        <ServiceBookingPanel
          title={this.state.pageData.title}
          link={this.props.match.params.title}
        />
      </div>
    );
  }
}

export default cardPage;
