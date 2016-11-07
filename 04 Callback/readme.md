# 04 Callback + State

In this sample we are going to refactor the previous sample **03 State**.

We'll update the name property only when the user clicks on
a _change_ button, we will simplify the event itself as well.

Obviously, we will take the sample **03 State** as a starting point.

Summary steps:

- Add a button to the `EditName` component and a handler function for this.
- Submit the name only when the user clicks on the button.
- Update the `app` component to handle the new simplified event.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content of the `03 State` folder to an empty folder for the sample
and make this your current folder.

- Install the npm packages described in the `package.json` and verify that it works:

  ```bash
  npm install
  ```

- Since we are going to use an internal handler, we'll transform the `NameEditComponent`
from a stateless component into a class component, then we will add some refactor on the naming.

 The `nameEdit.jsx` file should looks like this:

  ```jsx
  import * as React from 'react';

  class NameEditComponent extends React.Component {

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
    initialUserName: React.PropTypes.string.isRequired,
    onNameUpdated: React.PropTypes.func,
  };

  export default NameEditComponent;

  ```

- Let's wire this up in the `app.jsx` file.

  ```jsx
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
  ```

 Now we've got a clear event, strongly typed and simplified (straight forward).

- Let's give it a try:

  ```bash
  npm start
  ```

- Then, load http://localhost:8080/ in a browser to see the output.

 ![Browser Output](../99_readme_resources/04 Callback/browser_output.png "Browser Output")

 Now, the greeting only change when the user clicks on the change button.
