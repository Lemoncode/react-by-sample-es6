import * as React from 'react';

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

/* ColorDisplayer.propTypes = {
  color: React.PropTypes.shape({
    red: React.PropTypes.number.isRequired,
    green: React.PropTypes.number.isRequired,
    blue: React.PropTypes.number.isRequired,
  }).isRequired,
};*/

