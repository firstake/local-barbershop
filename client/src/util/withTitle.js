import React, {Component} from 'react';

export const withTitle = (PageComponent, title) => {
  return class Title extends Component {
    componentDidMount() {
      document.title = `${title} | Local Barbershop`;
    }

    render() {
      return <PageComponent {...this.props} />;
    }
  };
};
