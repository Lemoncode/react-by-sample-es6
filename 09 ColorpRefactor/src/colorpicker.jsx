import * as React from 'react';
import ColorSliderComponent from './colorslider';

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
  color: React.PropTypes.shape({
    red: React.PropTypes.number.isRequired,
    green: React.PropTypes.number.isRequired,
    blue: React.PropTypes.number.isRequired,
  }).isRequired,
  onColorUpdated: React.PropTypes.func.isRequired,
};
