# 03 State

In this sample we will introduce a basic React concept, handling State.

In this scenario we will provide a default username but let the user update it.

We will take as a starting point sample _[02 Properties](../02%20Properties/)_:

## Summary steps:

- Create an _`App`_ component that will hold the state, this state will contain the current username (by default assigned to "defaultUserName" value).
This _App_ component will render the _`Hello`_ component. At first we will create a simple stateless _`App`_ component.
- Update _[main.jsx](./src/main.jsx)_ file to include our _`App`_ component.
- Change _`App`_ component to a statful class component to hold the _`userName`_ state.
- Create a _`NameEdit`_ component to let the user change the username. This will change the _`App`_ state using a function from _`App`_.
- Check everything is working properly.

## Prerequisites

Install [Node.js and npm](https://nodejs.org) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[02 Properties](../02%20Properties/)_ and execute:

```bash
npm install
```

- Let's create an _`App`_ component under a new file named _[app.jsx](./src/app.jsx)_ (this component will display the _`Hello`_ component).

_[app.jsx](./src/app.jsx)_
```jsx
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
    render() {
      return (
        <div>
          <HelloComponent userName="John" />
        </div>
      );
    }
}
```

- Let's update _[main.jsx](./src/main.jsx)_ just to use the _App_ component that we have recently created.

_[main.jsx](./src/main.jsx)_
```diff
import React from 'react';
import {render} from 'react-dom';
-- import {HelloComponent} from './hello.jsx';
++ import { App } from './app';

render(
--  <HelloComponent userName="John" />,
++  <App />, 
    document.getElementById('root')
);
```

- Now we can check that things are still working as expected (nothing broken so far).

```bash
npm start
```

- It's time to revisit _[app.jsx](./src/app.jsx)_, since we want to store the name of the user and let the user updated it, let's move this component to a class stateful component and define a state, including _`userName`_ and pass this value to the _`Hello`_ component.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
++    constructor(props) {
++      super(props);

++      this.state = {
++        userName: 'defaultUserName',
++      };
++    }

    render() {
      return (
        <div>
--          <HelloComponent userName="John" />
++          <HelloComponent userName={this.state.userName} />
        </div>
      );
    }
  }

  ```

- Again, we can do a quick check to test that everything is working as expected.

```bash
npm start
```

- Now it's time to create an _`NameEdit`_ component, this component will let the user update his username and will notify with a callback to the parent control whenever the _`userName`_ gets updated.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export const NameEditComponent = (props) => (
  <div>
    <label htmlFor="userName">Update Name:</label>
    <input id="userName" value={props.userName} onChange={props.onChange} />
  </div>
);

NameEditComponent.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
```

- In the _[app.jsx](./src/app.jsx)_ file let's add a function to set the changed _`userName`_ in the state.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userName: 'defaultUserName',
    };

++  this.setUsernameState = this.setUsernameState.bind(this);
  }

++ setUsernameState(event) {
++    // If the state gets more complex we should use object.assign
++    this.setState({
++    userName: event.target.value,
++  });
++ }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
++      <NameEditComponent
++        userName={this.state.userName}
++        onChange={this.setUsernameState}
++      />
      </div>
    );
  }
}

  ```

- Finally let's test the final sample.

```bash
npm start
```
