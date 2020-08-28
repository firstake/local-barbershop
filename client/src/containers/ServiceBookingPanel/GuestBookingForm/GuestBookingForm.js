import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as API from '../../../API';

import DateTimePicker from '../../../components/DateTimePicker';
import './GuestBookingForm.css';

class GuestForm extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);

    this.state = {
      dateInputValue: null,
      timeInputValue: null,
      name: '',
      phone: '',
      email: '',
      successMessage: false,
    };
  }

  handleTimeChange(value) {
    this.setState({
      timeInputValue: value,
    });
  }

  handleDateChange(value) {
    this.setState({
      dateInputValue: value,
    });
  }

  handleGuestChange(evt) {
    const {name, value} = evt.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {title, link} = this.props;
    const {name, phone, email} = this.state;

    API.setBooking({
      date: this.state.dateInputValue.value,
      time: this.state.timeInputValue.value,
      title,
      link,
      name,
      phone,
      email,
    }).then(() => {
      this.setState({successMessage: true});
    });
  }

  render() {
    const {onCancel} = this.props;
    const {dateInputValue, timeInputValue, successMessage} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputs-container">
          <DateTimePicker
            dateInputValue={dateInputValue}
            handleDateChange={this.handleDateChange}
            timeInputValue={timeInputValue}
            handleTimeChange={this.handleTimeChange}
          />

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              autoComplete="name"
              required
              onChange={this.handleGuestChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              name="phone"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="form-control"
              id="phone"
              placeholder="777-444-3311"
              autoComplete="tel"
              required
              onChange={this.handleGuestChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              autoComplete="email"
              required
              onChange={this.handleGuestChange}
            />
            <small className="form-text text-muted">
              Don&apos;t be scary, we&apos;ll never share your email with anyone else.
            </small>
          </div>

          {successMessage && (
            <div className="alert-plate">
              <div
                className="alert
                alert-success
                text-center"
              >
                Succesfully! We will send the booking information to your phone.
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-3">
          {!successMessage && (
            <button
              type="submit"
              disabled={!timeInputValue && 'disabled'}
              className="btn btn-general text-white mr-3"
            >
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-danger"
          >
            {successMessage ? 'Close' : 'Cancel'}
          </button>
        </div>
      </form>
    );
  }
}

GuestForm.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  onCancel: PropTypes.func,
};

export default GuestForm;
