import React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

export class App extends React.Component {
  constructor(props) {
    super(props);

    const defaultUserName = 'defaultUserName';
    this.state = {userName: defaultUserName, editingUserName: defaultUserName};
  }

  setUsernameState() {
    this.setState({userName: this.state.editingUserName});
  }

  updateEditingName(editingName) {
    this.setState({editingUserName: editingName});
  }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
          editingUserName={this.state.editingUserName}
          onEditingNameUpdated={this.updateEditingName.bind(this)}
          onNameUpdateRequest={this.setUsernameState.bind(this)} />
      </div>
    );
  }
}