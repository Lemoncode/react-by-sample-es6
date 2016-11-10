import React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';
import { SidebarComponent } from './sidebar';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'defaultUserName',
      isSidebarVisible: false,
    };

    this.setUsernameState = this.setUsernameState.bind(this);
    this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
  }

  setUsernameState(event) {
    // If the state gets more complex we should use object.assign
    this.setState({
      userName: event.target.value,
    });
  }

  toggleSidebarVisibility() {
    const newVisibleState = !this.state.isSidebarVisible;

    this.setState({
      isSidebarVisible: newVisibleState,
    });
  }

  render() {
    const buttonStyle = {
      marginLeft: '450px',
    };

    return (
      <div>
        <SidebarComponent isVisible={this.state.isSidebarVisible}>
          <h1>Test content</h1>
        </SidebarComponent>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
          userName={this.state.userName}
          onChange={this.setUsernameState}
        />
        <input
          type="submit"
          value="Toggle Sidear"
          className="btn btn-default"
          style={buttonStyle}
          onClick={this.toggleSidebarVisibility}
        />
      </div>
    );
  }
}
