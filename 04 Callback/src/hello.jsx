import * as React from 'react';

const HelloComponent = props => (
  <h2>Hello user: {props.userName}!</h2>
);

HelloComponent.propTypes = {
  userName: React.PropTypes.string.isRequired,
};

export default HelloComponent;
