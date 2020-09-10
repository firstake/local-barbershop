import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class ScrollToTopUtil extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

ScrollToTopUtil.propTypes = {
  location: PropTypes.object,
};

export const ScrollToTop = withRouter(ScrollToTopUtil);
