import React from 'react';
import PropTypes from 'prop-types';

export class NameEditComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>Update Name:</label>
        <input value={this.props.editingUserName}
          onChange={(e) => this.props.onEditingNameUpdated(e.target.value)} />
        <input type="submit" value="Change" className="btn btn-default"
          onClick={this.props.onNameUpdateRequest} />
      </div>
    );
  }
}

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};