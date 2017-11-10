import * as React from 'react';
import ColorSliderComponent from './colorslider';
import PropTypes from 'prop-types';

export const ColorPicker = props => (
  <div>
    <ColorSliderComponent
      value={props.color.red}
      onValueUpdated={value =>
        props.onColorUpdated(
          {
            red: value,
            green: props.color.green,
            blue: props.color.blue,
          }
        )
      }
    />
    <br />
    <ColorSliderComponent
      value={props.color.green}
      onValueUpdated={value =>
        props.onColorUpdated(
          {
            red: props.color.red,
            green: value,
            blue: props.color.blue,
          }
        )
      }
    />
    <br />
    <ColorSliderComponent
      value={props.color.blue}
      onValueUpdated={value =>
        props.onColorUpdated(
          {
            red: props.color.red,
            green: props.color.green,
            blue: value,
          }
        )
      }
    />
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
