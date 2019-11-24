import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '../../components/dateTimePicker/dateTimePicker';

import './ServiceBookingPanelGuestForm.css';

class ServiceBookingPanelGuestForm extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      dateInputValue: null,
      timeInputValue: null,
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

  handleSubmit(e) {
    e.preventDefault();
    const home = document.location.origin;

    fetch(`${home}/api/set-user-booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: this.state.dateInputValue.value,
        time: this.state.timeInputValue.value,
        title: this.props.title,
        link: this.props.link,
        token: +localStorage.getItem('token'),
      }),
    }).then(() => {
      this.setState({ successMessage: true });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputs-container">
          <DateTimePicker
            dateInputValue={this.state.dateInputValue}
            handleDateChange={this.handleDateChange}
            timeInputValue={this.state.timeInputValue}
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
              required
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
              required
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
              required
            />
            <small className="form-text text-muted">
              Don't be scary, we'll never share your email with anyone else.
            </small>
          </div>

          {this.state.successMessage && (
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
          {!this.state.successMessage && (
            <button
              type="submit"
              disabled={!this.state.timeInputValue && 'disabled'}
              className="btn btn-general text-white mr-3"
            >
              Submit
            </button>
          )}
          <button
            onClick={this.props.onCancel}
            className="btn btn-danger"
          >
            {this.state.successMessage ? 'Close' : 'Cancel'}
          </button>
        </div>
      </form>
    );
  }
}

ServiceBookingPanelGuestForm.propTypes = {
  onCancel: PropTypes.func,
};

export default ServiceBookingPanelGuestForm;
