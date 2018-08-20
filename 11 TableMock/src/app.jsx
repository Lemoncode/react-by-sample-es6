import React from 'react';
import MembersTableComponent from './membersTable';

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
      <div className="col-xs-12">
         <MembersTableComponent />
      </div>
    );
  }
}