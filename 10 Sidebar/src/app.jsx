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
    const newVisibilityState = !this.state.isSidebarVisible;

    this.setState({
      isSidebarVisible: newVisibilityState,
    });
  }

  render() {
    return (
      <div>
        <SidebarComponent isVisible={this.state.isSidebarVisible}>
          <h1>Test content</h1>
        </SidebarComponent>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent 
          userName={this.state.userName} 
          onChange={this.setUsernameState} />
        <button 
          type="button" 
          className="btn btn-default float-right"
          onClick={this.toggleSidebarVisibility}>Toggle sidebar</button>
      </div>
    );
  }
}