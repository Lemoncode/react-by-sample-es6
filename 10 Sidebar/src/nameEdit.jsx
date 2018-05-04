import React from 'react';
import PropTypes from 'prop-types';

export const NameEditComponent = (props) => (
  <div>
    <label htmlFor="userName">Update Name:</label>
    <input id="userName" value={props.userName} onChange={props.onChange} />
  </div>
);

NameEditComponent.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
