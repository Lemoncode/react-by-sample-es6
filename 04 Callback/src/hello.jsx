import * as React from 'react';

export const HelloComponent = props => (
  <h2>Hello user: {props.userName}!</h2>
);

HelloComponent.propTypes = {
  userName: React.PropTypes.string.isRequired,
};
