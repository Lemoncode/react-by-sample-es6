# 12 Table Http

Let's move forward with the table sample, this time we are going to replace the
mock data by real one.

We will take a startup point sample _11 TableMock_:

Summary steps:

- Install promises dependencies and typescript definitions.
- Update API in order to work with promises and fetch data from Github API.
- Update the _tableComponent_ in order to show this data.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _11 TableMock_ and execute:

  ```
  npm install
  ```

- Let's add the dependencies to manage promises and typescript definitions

 - **[core-js](https://github.com/zloirock/core-js)**: includes polyfills for ECMAScript 5, ECMAScript 6: **promises**, symbols, collections, iterators, typed arrays, ECMAScript 7+ proposals, setImmediate, etc.

    ```
    npm install core-js --save
    ```

 - **[whatwg-fetch](https://github.com/github/fetch)**: AJAX calls.

    ```
    npm install whatwg-fetch --save
    ```

- Let's remove the file _mermberMockData.ts_ in _src/api_ directory.

- Let's define a model entity in _src/model/member.ts_:

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

- Let's replace _memberAPI_ load members with the fetch / promise one:

  ```javascript
  import {} from 'core-js';
  import 'whatwg-fetch';
  import MemberEntity from '../model/member';

  // Sync mock data API, inspired from:
  // https://gist.github.com/coryhouse/fd6232f95f9d601158e4
  class MemberAPI {

    // Just return a copy of the mock data
    getAllMembers() {
      const gitHubMembersUrl = 'https://api.github.com/orgs/lemoncode/members';

      return fetch(gitHubMembersUrl)
        .then(response => this.checkStatus(response))
        .then(response => this.parseJSON(response))
        .then(data => this.resolveMembers(data));
    }

    checkStatus(response) {
      if (!(response.status >= 200 && response.status < 300)) {
        const error = new Error(response.statusText);
        throw error;
      }
      return Promise.resolve(response);
    }

    parseJSON(response) {
      return response.json();
    }

    resolveMembers(data) {
      const members = data.map((gitHubMember) => {
        const member = new MemberEntity();

        member.id = gitHubMember.id;
        member.login = gitHubMember.login;
        member.avatar_url = gitHubMember.avatar_url;

        return member;
      });

      return Promise.resolve(members);
    }
  }

  const memberAPI = new MemberAPI();

  export default memberAPI;

  ```

- Now it's time to update our _membersTable_ component. <br />
  Let's consume the new promise base method to retrieve the users:

  ```jsx
  // Standard react lifecycle function:
  // https://facebook.github.io/react/docs/component-specs.html
  componentWillMount() {
    memberAPI.getAllMembers().then(members =>
      this.setState({members: members})
    );
  }

  ```

- Let's give a try and check the results

  ```
  npm start
  ```
