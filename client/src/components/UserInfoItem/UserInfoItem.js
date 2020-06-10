import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './UserInfoItem.css';

class UserInfoItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);

    this.textInput = React.createRef();

    this.state = {
      currentValue: this.props.text,
      currentTarget: null,
      isChanging: false,
    };
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

  cancelChanges(evt) {
    evt.preventDefault();

    this.setState({
      isChanging: false,
      currentValue: this.props.text,
    });
  }

  render() {
    const {
      name, title, type, pattern, minLength, cssClass,
    } = this.props;
    const {isChanging, currentValue} = this.state;

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
          <input
            className="m-1 mr-auto form-control-lean"
            id={name}
            name={name}
            onChange={this.handleChange}
            type={type}
            minLength={minLength || null}
            pattern={type === 'phone' ? null : pattern}
            value={currentValue}
            required="required"
            disabled={!isChanging}
            ref={this.textInput}
          />
          {isChanging ? (
            <div>
              <button
                type="submit"
                className="p-0 m-1 btn btn-link text-success"
              >
                Save
              </button>
              <button
                onClick={this.cancelChanges}
                className="p-0 m-1 btn btn-link text-danger"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={this.handleClick} className="p-0 m-1 btn btn-link">
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
  pattern: PropTypes.string,
  minLength: PropTypes.string,
};

export default UserInfoItem;
