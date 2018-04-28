# 06 MoveBackToStateless

In example [05](../05%20Refactor/) we learned how to remove state from a child control just to have clear governance of state.

It's time to make some cleanup, let's simplify _`nameEdit`_ component and move it as a stateless component.

We will take a startup point sample _[05 Refactor](../05%20Refactor/)_.

Summary steps:

- Update _[nameEdit.jsx](./src/nameEdit.jsx)_, port it to stateless component and add the methods inline.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[05 Refactor](../05%20Refactor/)_ and execute `npm install`.

- Update _[nameEdit.jsx](./src/nameEdit.jsx)_, port it to stateless component and add the methods inline. It should look like:

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

-- export class NameEditComponent extends React.Component {
++ export const NameEditComponent = (props) => {
--  constructor(props) {
--    super(props);
--  }

--  render() {
    return (
      <div>
        <label>Update Name:</label>
        <input 
--        value={this.props.editingUserName}      
++        value={props.editingUserName}
--        onChange={(e) => this.props.onEditingNameUpdated(e.target.value)}
++        onChange={(e) => props.onEditingNameUpdated(e.target.value)} 
        />
        <input 
          type="submit" 
          value="Change" 
          className="btn btn-default"
--        onClick={this.props.onNameUpdateRequest}         
++        onClick={props.onNameUpdateRequest} 
        />
      </div>
    );
-- }
}

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
```

Finally we can check the sample executing from the command line `npm start` and opening [http://localhost:8080](http://localhost:8080).