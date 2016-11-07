import React from 'react';

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
  editingUserName: React.PropTypes.string.isRequired,
  onEditingNameUpdated: React.PropTypes.func.isRequired,
  onNameUpdateRequest: React.PropTypes.func.isRequired
};