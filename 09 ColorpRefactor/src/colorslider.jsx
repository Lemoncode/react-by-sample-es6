import * as React from 'react';
import PropTypes from 'prop-types';

const ColorSliderComponent = props => (
  <div>
    <input
      type="range"
      min="0"
      max="255"
      value={props.value}
      onChange={event => props.onValueUpdated(parseInt(event.target.value, 10))}
    />
    {props.value}
  </div>
);

ColorSliderComponent.propTypes = {
  value: PropTypes.number.isRequired,
  onValueUpdated: PropTypes.func.isRequired,
};

export default ColorSliderComponent;
