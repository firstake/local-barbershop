import {Component} from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  render() {
    const {children, active} = this.props;
    return children[active];
  }
}

Tabs.propTypes = {
  active: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Tabs;
