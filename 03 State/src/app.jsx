import React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'defaultUserName',
    };

    this.setUsernameState = this.setUsernameState.bind(this);
  }

  setUsernameState(event) {
    // If the state gets more complex we should use object.assign
    this.setState({
      userName: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
          userName={this.state.userName}
          onChange={this.setUsernameState}
        />
      </div>
    );
  }
}