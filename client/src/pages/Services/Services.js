import React, {Component} from 'react';

import * as API from '../../API';

import Card from '../../components/Card';

import './Services.css';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentDidMount() {
    API.getServices().then((data) => this.setState({data}));
  }

  render() {
    const {data} = this.state;

    return (
      <div className="f-h">
        <div className="container">
          <h1 className="text-center pt-4 pb-2 border-bottom">Services</h1>
        </div>
        {data ? (
          <div className="container pb-4 pt-3">
            <div className="card-deck">
              {data.map((item) => (
                <Card data={item} key={item.link} />
              ))}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center spinner-container">
            <div className="spinner-border text-warning " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Services;
