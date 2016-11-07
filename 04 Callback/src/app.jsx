import React from 'react';
import HelloComponent from './hello';
import NameEditComponent from './nameEdit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: 'defaultUserName' };
    this.setUsernameState = this.setUsernameState.bind(this);
  }

  setUsernameState(newName) {
    this.setState({ userName: newName });
  }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
          initialUserName="Javier Cansado"
          onNameUpdated={this.setUsernameState}
        />
      </div>
    );
  }
}

export default App;
