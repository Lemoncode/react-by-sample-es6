import React from 'react';

export const NameEditComponent = (props) => {
  return (
    <div>
      <label>Update Name:</label>
      <input value={props.editingUserName}
        onChange={(e) => props.onEditingNameUpdated(e.target.value)} />
      <input type="submit" value="Change" className="btn btn-default"
        onClick={props.onNameUpdateRequest} />
    </div>
  );
}

NameEditComponent.propTypes = {
  editingUserName: React.PropTypes.string.isRequired,
  onEditingNameUpdated: React.PropTypes.func.isRequired,
  onNameUpdateRequest: React.PropTypes.func.isRequired
};
