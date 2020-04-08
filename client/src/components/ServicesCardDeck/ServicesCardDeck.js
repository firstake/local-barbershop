import React, { Component } from 'react';
import Card from '../Card';

class ServicesCardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch('api/services')
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return (
        <div className="d-flex justify-content-center align-items-center f-h">
          <div className="spinner-border text-warning " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="container pb-4 pt-3">
        <div className="card-deck">
          {data.map((item) => (
            <Card data={item} key={item.link} />
          ))}
        </div>
      </div>
    );
  }
}

export default ServicesCardDeck;
