import * as React from 'react';
import PropTypes from 'prop-types';

export const ColorPicker = props => (
  <div>
    <input
      type="range"
      min="0"
      max="255"
      value={props.color.red}
      onChange={event =>
        props.onColorUpdated(
          {
            red: parseInt(event.target.value, 10),
            green: props.color.green,
            blue: props.color.blue,
          }
        )
      }
    />
    { props.color.red }
    <br />
    <input
      type="range"
      min="0"
      max="255"
      value={props.color.green}
      onChange={event =>
        props.onColorUpdated(
          {
            red: props.color.red,
            green: parseInt(event.target.value, 10),
            blue: props.color.blue,
          }
        )
      }
    />
    { props.color.green }
    <br />
    <input
      type="range"
      min="0"
      max="255"
      value={props.color.blue}
      onChange={event =>
        props.onColorUpdated(
          {
            red: props.color.red,
            green: props.color.green,
            blue: parseInt(event.target.value, 10),
          }
        )
      }
    />
    { props.color.blue }
    <br />
  </div>
);

ColorPicker.propTypes = {
  color: PropTypes.shape({
    red: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
  }).isRequired,
  onColorUpdated: PropTypes.func.isRequired,
};
