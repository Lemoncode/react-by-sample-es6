import React from 'react';
import PropTypes from 'prop-types';

export const NameEditComponent = (props) => {
  return (
    <div>
      <label>Update Name:</label>
      <input value={props.editingUserName}
        onChange={(e) => props.onEditingNameUpdated(e.target.value)} />
      <input type="submit" value="Change"
        className="btn btn-default"
        onClick={props.onNameUpdateRequest}
        disabled={props.editingUserName === '' || props.userName === props.editingUserName}
        />
    </div>
  );
}

NameEditComponent.propTypes = {
  userName: PropTypes.string.isRequired,
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
