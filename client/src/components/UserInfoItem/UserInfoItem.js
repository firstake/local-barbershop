import React, {Component} from 'react';
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

  saveChanges(evt) {
    evt.preventDefault();

    this.props.saveChanges(this.state.currentTarget, this.state.currentValue);
    this.setState({
      isChanging: false,
      currentTarget: null,
    });
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
      name, title, text, type, pattern, minLength, cssClass,
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
        <span className="m-1 text-muted">{title}</span>
        {isChanging ? (
          <form
            onSubmit={this.saveChanges}
            style={{
              flexGrow: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap',
            }}
          >
            <input
              className="m-1 mr-auto form-control-lean"
              name={name}
              onChange={this.handleChange}
              type={type}
              minLength={minLength || null}
              pattern={type === 'phone' ? null : pattern}
              defaultValue={type === 'password' ? '' : currentValue}
              required="required"
            />
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
          </form>
        ) : (
          <>
            <span className="m-1 mr-auto">{text}</span>
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
  pattern: PropTypes.string,
  minLength: PropTypes.string,
};

export default UserInfoItem;
