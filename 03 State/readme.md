# 03 State

In this sample we will introduce a basic React concept, handling State.

In this scenario we will provide a default username but let the user update
it.

We will take as a starting point sample _02 Properties_:

## Summary steps:

- Create an _App_ component that will hold the state, this state will contain the current
username (by default assigned to "defaultUserName" value).
This _App_ component will render the _Hello_ component. At first we will create a simple stateless
_App_ component.
- Update _main.jsx_ file to include our _App_ component.
- Change _App_ component to a statful class component to hold the _userName_ state.
- Create a _NameEdit_ component to let the user change the username. This will change the _App_ state
using a function from _App_.
- Check everything is working properly.

## Prerequisites

Install [Node.js and npm](https://nodejs.org) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 Properties_ and execute:

  ```
  npm install
  ```

- Let's create an _App_ component under a new file named _app.jsx_ (this component will display the _Hello_ component).

  ```jsx
  export const HelloComponent = props => (
    <h2>Hello user: {props.userName}!</h2>
  );

  HelloComponent.propTypes = {
    userName: React.PropTypes.string.isRequired,
  };

  ```

- Let's update _main.jsx_ just to use the _App_ component that we have recently created.

  ```jsx
  /* global document */

  import React from 'react';
  import { render } from 'react-dom';
  import { App } from './app';

  render(
    <App />
    , document.getElementById('root')
  );

  ```

- Now we can check that things are still working as expected (nothing broken so far).

  ```
  npm start
  ```

- It's time to revisit _app.jsx_, since we want to store the name of the user and let the
user updated it, let's move this component to a class stateful component and define
a state, including _userName_ and pass this value to the _Hello_ component.

  ```jsx
  import React from 'react';
  import { HelloComponent } from './hello';

  export class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userName: 'defaultUserName',
      };
    }

    render() {
      return (
        <div>
          <HelloComponent userName={this.state.userName} />
        </div>
      );
    }
  }

  ```

- Again, we can do a quick check to test that everything is working as expected.

  ```
  npm start
  ```

- Now it's time to create an _NameEdit_ component, this component will let the user
update his username and will notify with a callback to the parent control whenever
the _userName_ gets updated.

  ```jsx
  import React from 'react';

  export const NameEditComponent = props => (
    <div>
      <label htmlFor="userName">Update Name:</label>
      <input id="userName" value={props.userName} onChange={props.onChange} />
    </div>
  );

  NameEditComponent.propTypes = {
    userName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  ```

- In the _app.jsx_ file let's add a function to set the changed _userName_ in the state.

  ```jsx
  import React from 'react';
  import { HelloComponent } from './hello';

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

  ```

- Finally let's test the final sample.

  ```
  npm start
  ```
