import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const immutableTimeSelectOptions = [
  {value: 11, label: '11:00', isDisabled: false},
  {value: 12, label: '12:00', isDisabled: false},
  {value: 13, label: '13:00', isDisabled: false},
  {value: 14, label: '14:00', isDisabled: false},
  {value: 15, label: '15:00', isDisabled: false},
  {value: 16, label: '16:00', isDisabled: false},
  {value: 17, label: '17:00', isDisabled: false},
  {value: 18, label: '18:00', isDisabled: false},
];

const selectStyles = {
  control: (styles) => ({...styles, fontSize: '1rem', paddingLeft: 1}),
  option: (styles) => ({...styles, fontSize: '1rem'}),
};

class DateTimePicker extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);

    this.state = {
      dateSelectIsDisabled: true,
      timeSelectIsDisabled: true,
      dateSelectOptions: null,
      timeSelectOptions: immutableTimeSelectOptions,
    };
  }

  componentDidMount() {
    const home = document.location.origin;

    fetch(`${home}/api/get-booking-dates`)
        .then((res) => res.json())
        .then((data) => this.setState({dateSelectOptions: data, dateSelectIsDisabled: false}));
  }

  handleDateChange(inputValue) {
    const clonedTimeSelectOptions = JSON.parse(
        JSON.stringify(immutableTimeSelectOptions),
    );
    const {handleDateChange, handleTimeChange} = this.props;

    if (inputValue.time) {
      clonedTimeSelectOptions.forEach((item) => {
        if (inputValue.time.includes(item.value)) {
          item.isDisabled = true;
        }
      });
    }

    this.setState({
      timeSelectOptions: clonedTimeSelectOptions,
      timeSelectIsDisabled: false,
    });

    handleDateChange(inputValue);
    handleTimeChange(null);
  }

  handleTimeChange(value) {
    this.props.handleTimeChange(value);
  }

  render() {
    const {
      dateSelectOptions, dateSelectIsDisabled, timeSelectOptions, timeSelectIsDisabled,
    } = this.state;
    const {timeInputValue} = this.props;

    return (
      <>
        <p className="mb-2">Select time and date</p>
        <Select
          onChange={this.handleDateChange}
          options={dateSelectOptions}
          isDisabled={dateSelectIsDisabled}
          placeholder="Select date"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#dda122',
            },
          })}
          styles={selectStyles}
        />
        <Select
          value={timeInputValue}
          className="my-3"
          onChange={this.handleTimeChange}
          options={timeSelectOptions}
          isDisabled={timeSelectIsDisabled}
          placeholder="Select time"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#dda122',
            },
          })}
          styles={selectStyles}
        />
      </>
    );
  }
}

DateTimePicker.propTypes = {
  handleDateChange: PropTypes.func,
  handleTimeChange: PropTypes.func,
  dateInputValue: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object,
  ]),
  timeInputValue: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object,
  ]),
};

export default DateTimePicker;
