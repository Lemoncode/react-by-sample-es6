import * as React from 'react';
import PropTypes from 'prop-types';

export class NameEditComponent extends React.Component {

  constructor(props) {
    super(props);
    // Watch out what would happen if we get this user name via an AJAX callback
    // you will find a different implementatin on 05 sample
    this.state = {
      editingName: this.props.initialUserName,
    };

    this.onChange = this.onChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ editingName: event.target.value });
  }

  onNameSubmit() {
    this.props.onNameUpdated(this.state.editingName);
  }

  render() {
    return (
      <div>
        <label htmlFor="editingName">Update Name:</label>
        <input value={this.state.editingName} onChange={this.onChange} id="editingName" />
        <input type="submit" value="Change" className="btn btn-default" onClick={this.onNameSubmit} />
      </div>
    );
  }
}

NameEditComponent.propTypes = {
  initialUserName: PropTypes.string.isRequired,
  onNameUpdated: PropTypes.func,
};
