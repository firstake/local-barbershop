import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);

    this.state = {
      currentValue: this.props.text,
      currentTarget: null,
      isChanging: false,
    };
  }

  handleClick() {
    this.setState({
      isChanging: true,
    });
  }

  handleChange(evt) {
    this.setState({
      currentValue: evt.target.value,
      currentTarget: evt.target.name,
    });
  }

  saveChanges() {
    this.props.saveChanges(this.state.currentTarget, this.state.currentValue);
    this.setState({
      isChanging: false,
      currentTarget: null,
    });
  }

  cancelChanges() {
    this.setState({
      isChanging: false,
      currentValue: this.props.text,
    });
  }

  render() {
    return (
      <li
        className={`d-flex
        justify-content-between
        align-items-center
        flex-wrap
        list-group-item ${this.props.cssClass ? this.props.cssClass : ''}`}
      >
        <span className="m-1 text-muted">{this.props.title}</span>
        {this.state.isChanging ? (
          <>
            <input
              className="m-1 mr-auto"
              name={this.props.name}
              onChange={this.handleChange}
              type={this.props.type}
              pattern={this.props.type === 'phone' ? null : this.props.pattern}
              defaultValue={
                this.props.type === 'password' ? '' : this.state.currentValue
              }
              required="required"
            />
            <div>
              <button
                onClick={this.saveChanges}
                className="p-0 m-1 btn btn-link text-success"
              >
                Save
              </button>
              <button
                onClick={this.cancelChanges}
                type="button"
                className="p-0 m-1 btn btn-link text-danger"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="m-1 mr-auto">{this.props.text}</span>
            <button onClick={this.handleClick} className="p-0 m-1 btn btn-link">
              Change
            </button>
          </>
        )}
      </li>
    );
  }
}

UserInfoItem.propTypes = {
  saveChanges: PropTypes.func,
  cssClass: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default UserInfoItem;
