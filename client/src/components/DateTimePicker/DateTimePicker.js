import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import * as API from '../../API';

const timeSelectOptions = [
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
      timeSelectOptions,
      datePlaceholder: 'Loading dates...',
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const {datePlaceholder} = this.state;

      if (datePlaceholder.length < 16) {
        this.setState((prevState) => ({
          datePlaceholder: `${prevState.datePlaceholder}.`,
        }));
      } else {
        this.setState({
          datePlaceholder: 'Loading dates.',
        });
      }
    }, 200);

    API.getBookingDates()
        .then((data) => {
          clearInterval(this.timer);

          this.setState({
            datePlaceholder: 'Select date',
            dateSelectOptions: data,
            dateSelectIsDisabled: false,
          });
        });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleDateChange(inputValue) {
    const clonedTimeSelectOptions = JSON.parse(
        JSON.stringify(timeSelectOptions),
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
      dateSelectOptions, dateSelectIsDisabled,
      timeSelectOptions, timeSelectIsDisabled,
      datePlaceholder,
    } = this.state;
    const {timeInputValue} = this.props;

    return (
      <>
        <p className="mb-2">Select time and date</p>
        <Select
          onChange={this.handleDateChange}
          options={dateSelectOptions}
          isDisabled={dateSelectIsDisabled}
          placeholder={datePlaceholder}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#dda122',
            },
          })}
          styles={selectStyles}
          isSearchable={false}
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
          isSearchable={false}
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
