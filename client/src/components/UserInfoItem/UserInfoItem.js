import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import './UserInfoItem.css';

class UserInfoItem extends Component {
  constructor(props) {
    super(props);

    this.getType = this.getType.bind(this);
    this.togglePassVisiblity = this.togglePassVisiblity.bind(this);
    this.resetPassVisiblity = this.resetPassVisiblity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);

    this.textInput = React.createRef();

    this.state = {
      currentValue: this.props.text,
      currentTarget: null,
      isChanging: false,
      isPassShown: false,
    };
  }

  getType() {
    const {type} = this.props;
    const {isPassShown} = this.state;

    if (type === 'password') {
      return (isPassShown ? 'text' : 'password');
    }
    return type;
  }

  togglePassVisiblity() {
    this.setState((prevState) => ({isPassShown: !prevState.isPassShown}));
  }

  resetPassVisiblity() {
    this.setState({
      isPassShown: false,
    });
  }

  handleClick() {
    const stateObject = {
      isChanging: true,
    };

    if (this.props.type === 'password') {
      stateObject.currentValue = '';
    }

    this.setState(stateObject, () => this.textInput.current.focus());
  }

  handleChange(evt) {
    this.setState({
      currentValue: evt.target.value,
      currentTarget: evt.target.name,
    });
  }

  saveChanges(evt) {
    evt.preventDefault();
    this.resetPassVisiblity();

    const stateObject = {
      isChanging: false,
      currentTarget: null,
    };

    if (this.props.type === 'password') {
      stateObject.currentValue = '******';
    }

    this.props.saveChanges(this.state.currentTarget, this.state.currentValue);
    this.setState(stateObject);
  }

  cancelChanges() {
    this.resetPassVisiblity();
    this.setState({
      isChanging: false,
      currentValue: this.props.text,
    });
  }

  render() {
    const {
      name, title, type, autocomplete, pattern, minLength, cssClass,
    } = this.props;
    const {isChanging, currentValue, isPassShown} = this.state;

    return (
      <li
        className={`d-flex
        justify-content-between
        align-items-center
        flex-wrap
        list-group-item ${cssClass || ''}`}
      >
        <form
          onSubmit={this.saveChanges}
          style={{
            flexGrow: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap',
          }}
        >
          <label htmlFor={name} className="m-1 text-muted">{title}</label>
          <div className={`${type === 'password' ? 'password-wrapper ' : ''}m-1 mr-auto`}>
            <input
              className="form-control-lean"
              id={name}
              name={name}
              onChange={this.handleChange}
              type={this.getType()}
              autoComplete={autocomplete}
              minLength={minLength || null}
              pattern={type === 'phone' ? null : pattern}
              value={currentValue}
              required="required"
              disabled={!isChanging}
              ref={this.textInput}
            />
            {type === 'password' && isChanging ? (
              <button
                type="button"
                className="btn-toggle-password"
                onClick={this.togglePassVisiblity}
              >
                <FontAwesomeIcon icon={isPassShown ? faEye : faEyeSlash} />
              </button>
            ) : null}
          </div>
          {isChanging ? (
            <div>
              <button
                type="submit"
                className="p-0 m-1 btn btn-link text-success"
              >
                Save
              </button>
              <button
                type="button"
                onClick={this.cancelChanges}
                className="p-0 m-1 btn btn-link text-danger"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={this.handleClick}
              className="p-0 m-1 btn btn-link"
            >
              Change
            </button>
          )}
        </form>
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
  autocomplete: PropTypes.string,
  pattern: PropTypes.string,
  minLength: PropTypes.string,
};

export default UserInfoItem;
