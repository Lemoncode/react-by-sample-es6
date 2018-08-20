# 11 TableMock

Let's render a table and use a child component to render each row.

We will start by just creating some mock data.

We will take a startup point sample _03 State_:

Summary steps:

- Define a model entity (we will call it _member_).
- Define a fake api (to take thing simple we will just make it synchronous).
- We will row component, we will call it _memberRow_.
- Create a table component, we will call it _memberTable_ and make use of _memberRow.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute:

```
npm install
```

- Let's create a model entity in _src/model/member.js_:

```javascript
class MemberEntity {
  constructor() {
    this.id = -1;
    this.login = '';
    this.avatar_url = '';
  }
}

export default MemberEntity;

```

- Let's create some mock data in _src/api/memberMockData.js_:

```javascript
const MembersMockData = [
  {
    id: 1457912,
    login: 'brauliodiez',
    avatar_url: 'https://avatars.githubusercontent.com/u/1457912?v=3',
  },
  {
    id: 4374977,
    login: 'Nasdan',
    avatar_url: 'https://avatars.githubusercontent.com/u/4374977?v=3',
  },
];

export default MembersMockData;

```

- Define a fake api (to take thing simple we will just make it synchronous) in _src/api/memberAPI.js_:

```javascript
import MembersMockData from './memberMockData';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  // This would be performed on the server in a real app. Just stubbing in.
  static _clone(item) {
    return (
      // return cloned copy so that the item is passed by value instead of by reference
      JSON.parse(JSON.stringify(item))
    );
  }

  // Just return a copy of the mock data
  getAllMembers() {
    return (
      MemberAPI._clone(MembersMockData)
    );
  }
}

const memberAPI = new MemberAPI();

export default memberAPI;

```

- Now it's time jump into the interesting part, let's delete _src/hello.jsx_ and _src/nameEdit.jsx_.

- We are going to create an stateless component that will display a single row _src/memberRow.jsx_.

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';

const MemberRow = props => (
  <tr>
    <td>
      <img src={props.member.avatar_url} style={{ maxWidth: '150px' }} alt="Avatar" />
    </td>
    <td>
      <span>{props.member.id}</span>
    </td>
    <td>
      <span>{props.member.login}</span>
    </td>
  </tr>
);

MemberRow.propTypes = {
  // Is impossible to use:
  //   member: PropTypes.instanceOf(MemberEntity),
  // with _clone().
  member: PropTypes.shape({
    id: PropTypes.number,
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }),
};

export default MemberRow;

```

We can't use max-widh in the param style in. We must write 'maxWidth' in the react components.

- Then we are going to implement a component that will display a list of members (and will
  make use of rows), _src/membersTable.jsx_:

```jsx
import * as React from 'react';
import memberAPI from './api/memberAPI';
import MemberRow from './memberRow';

class MembersTable extends React.Component {

  constructor(props) {
    super(props);
    // set initial state
    this.state = { members: [] };
  }

  // Standard react lifecycle function:
  // https://facebook.github.io/react/docs/component-specs.html
  componentWillMount() {
    this.setState({ members: memberAPI.getAllMembers() });
  }

  render() {
    return (
      <div>
        <h2>Members Page</h2>
        <table className="table">
          <thead>
            <tr>
              <th>
                Avatar
              </th>
              <th>
                Id
              </th>
              <th>
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.members.map(member =>
                <MemberRow key={member.id} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MembersTable;

```

- Let's update _src/app.jsx_:

```jsx
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

```

- Let's run the sample

  ```
  npm start
  ```
