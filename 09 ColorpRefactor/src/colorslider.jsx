import * as React from 'react';

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
  value: React.PropTypes.number.isRequired,
  onValueUpdated: React.PropTypes.func.isRequired,
};

export default ColorSliderComponent;
