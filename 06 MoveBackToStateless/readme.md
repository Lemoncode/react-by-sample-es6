# 06 MoveBackToStateless

In example 05 we learned how to remove state from a child control just to have clear governance of state.

It's time to make some cleanup, let's simplify _nameEdit_ component and move it as a stateless component.

We will take a startup point sample _05 MoveBacktOStateless_.

Summary steps:

- Update _nameEdit.jsx_, port it to stateless component and add the methods inline.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _05 Refactor_ and execute `npm install`.

- Update _nameEdit.jsx_, port it to stateless component and add the methods inline. It should look like:

  ```jsx
  import React from 'react';

  export const NameEditComponent = (props) => {
    return (
      <div>
        <label>Update Name:</label>
        <input value={props.editingUserName}
          onChange={(e) => props.onEditingNameUpdated(e.target.value)} />
        <input type="submit" value="Change" className="btn btn-default"
          onClick={props.onNameUpdateRequest} />
      </div>
    );
  }

  NameEditComponent.propTypes = {
    editingUserName: React.PropTypes.string.isRequired,
    onEditingNameUpdated: React.PropTypes.func.isRequired,
    onNameUpdateRequest: React.PropTypes.func.isRequired
  };

  ```
