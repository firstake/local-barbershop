import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '../../../components/DateTimePicker';

class UserBookingForm extends Component {
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
    const {newBooking, onCancel, title, link} = this.props;
    const {dateInputValue, timeInputValue} = this.state;

    newBooking(
        dateInputValue.value,
        timeInputValue.value,
        title,
        link,
    );
    onCancel(e);
  }

  render() {
    const {onCancel} = this.props;
    const {dateInputValue, timeInputValue} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <DateTimePicker
          dateInputValue={dateInputValue}
          handleDateChange={this.handleDateChange}
          timeInputValue={timeInputValue}
          handleTimeChange={this.handleTimeChange}
        />
        <div className="text-center">
          <button
            type="submit"
            disabled={!timeInputValue && 'disabled'}
            className="btn btn-general text-white"
          >
            Submit
          </button>
          <button onClick={onCancel} className="btn btn-danger ml-3">Cancel</button>
        </div>
      </form>
    );
  }
}

UserBookingForm.propTypes = {
  onCancel: PropTypes.func,
  newBooking: PropTypes.func,
  link: PropTypes.string,
  title: PropTypes.string,
};

export default UserBookingForm;
