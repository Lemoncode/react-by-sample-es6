import * as React from 'react';
import PropTypes from 'prop-types';

export const ColorDisplayer = (props) => {
  // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
  // 'rgb(' + props.color.red + ', 40, 80)'
  const divStyle = {
    width: '120px',
    height: '80px',
    backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`,
  };

  return (
    <div style={divStyle} />
  );
};

ColorDisplayer.propTypes = {
  color: PropTypes.shape({
    red: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
  }).isRequired,
};
