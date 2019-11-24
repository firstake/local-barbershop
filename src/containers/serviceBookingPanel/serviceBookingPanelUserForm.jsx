import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '../../components/dateTimePicker/dateTimePicker';

class ServiceBookingPanelUserForm extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      dateInputValue: null,
      timeInputValue: null,
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
    this.props.newBooking(
      this.state.dateInputValue.value,
      this.state.timeInputValue.value,
      this.props.title,
      this.props.link,
      this.props.token,
    );
    this.props.onCancel(e);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <DateTimePicker
          dateInputValue={this.state.dateInputValue}
          handleDateChange={this.handleDateChange}
          timeInputValue={this.state.timeInputValue}
          handleTimeChange={this.handleTimeChange}
        />
        <div className="text-center">
          <button
            type="submit"
            disabled={!this.state.timeInputValue && 'disabled'}
            className="btn btn-general text-white"
          >
            Submit
          </button>
          <button onClick={this.props.onCancel} className="btn btn-danger ml-3">Cancel</button>
        </div>
      </form>
    );
  }
}

ServiceBookingPanelUserForm.propTypes = {
  onCancel: PropTypes.func,
  newBooking: PropTypes.func,
  link: PropTypes.string,
  title: PropTypes.string,
  token: PropTypes.number,
};

export default ServiceBookingPanelUserForm;
