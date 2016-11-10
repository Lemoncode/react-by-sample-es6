import React from 'react';

export const NameEditComponent = props => (
  <div>
    <label htmlFor="userName">Update Name:</label>
    <input id="userName" value={props.userName} onChange={props.onChange} />
  </div>
);

NameEditComponent.propTypes = {
  userName: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
