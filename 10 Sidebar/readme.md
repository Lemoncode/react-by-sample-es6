# 10 Sidebar

In this sample we are going to implement a single sidebar.

We will take a startup point sample _03 State_:

Summary steps:

- Add some styles.
- Include the new css into the webpack loop.
- Create a sidebar component.
- Let's add some content to the sidebar.
- Add a button to open / close the sidebar.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _03 State_ and execute:

  ```
  npm install
  ```

- Create a file called _src/styles.css_ and add the following styles (http://www.w3schools.com/howto/howto_js_sidenav.asp):

  ```css
  /* The side navigation menu */
  .sidenav {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1; /* Stay on top */
      top: 0;
      left: 0;
      background-color: #808080; /* Gray*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }


  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
      transition: margin-left .5s;
      padding: 20px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
  }
  ```

- Add this css file to the webpack entry point:

  ```javascript
  entry: [
    './main.jsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    './styles.css'
  ],
  ```

- We are going to create now a sidebar component, _src/sidebar.jsx_. Right now we will create just
a rectangle and we will interact with the animation.

  ```jsx
  import * as React from 'react';

  export const SidebarComponent = () => (
    <div id="mySidenav" className="sidenav">
      <span>Basic side bar, first steps</span>
    </div>
  );

  ```

- We are going to add a known id to to body section of _src/index.html_ page

  ```html
  <body id="main">
  ```

- Let's place the component adding into the app.jsx:

  ```jsx
  import { SidebarComponent } from './sidebar';
  ```

  ```jsx
  return (
    <div>
      <SidebarComponent />
      <HelloComponent userName={this.state.userName} />
      <NameEditComponent
        userName={this.state.userName}
        onChange={this.setUsernameState}
      />
    </div>
  );

  ```

- Now is time to run the app, just to check we haven't broken anything (but you will see no results).

  ```
  npm start
  ```

- Let's start with the interesting part of this implementation, let's add a flag to show/hide the
sidebar _sidebar.jsx_.

  ```jsx
  export const SidebarComponent = props => (
    <div id="mySidenav" className="sidenav">
      <span>Basic side bar, first steps</span>
    </div>
  );
  ```

- Now let's add some logic to show / display the sidebar in case the flag gets
updated

  ```jsx
  export const SidebarComponent = (props) => {
    const divStyle = {
      width: (props.isVisible) ? '250px' : '0px',
    };

    return (
      <div id="mySidenav" className="sidenav" style={divStyle}>
        <span>Basic side bar, first steps</span>
      </div>
    );
  };

  SidebarComponent.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
  };

  ```

- Now at app level (in file _app.jsx_) we can add a new member to the state (a boolean flag) and a button to turn it
off and on.

  ```jsx
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
          <SidebarComponent isVisible={this.state.isSidebarVisible} />
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

  ```

- If we run our sample, we can see how the sidebar is shown / hidden:

- So far so good, but what happens if we want to make this sidebar a reusable component, we could
just show the frame but the content should be dynamic.

- Let's start by adding some content when instantiating the sidebar (_app.jsx_).

  ```jsx
  <SidebarComponent isVisible={this.state.isSidebarVisible}>
    <h1>Test content</h1>
  </SidebarComponent>
  ```

- Now in the _sidebar.jsx_ let's dump this content by using {this.props.children}

  ```jsx
  import * as React from 'react';

  export class SidebarComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        divStyle: {
          width: '0px',
        },
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible !== nextProps.isVisible) {
        const widthValue = (nextProps.isVisible) ? '250px' : '0px';
        // TODO we could remove this and try to use single source of truth
        // a function that just calculates the value based on the visible flag
        this.setState({ divStyle: { width: widthValue } });
      }
    }

    render() {
      return (
        <div id="mySidenav" className="sidenav" style={this.state.divStyle}>
          {this.props.children}
        </div>
      );
    }
  }

  SidebarComponent.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
  };

  ```

- We can refact to transform the `SidebarComponent` again to be an *stateless* Component. We should keep the interim step, but end up with something like:

  ```jsx
  import * as React from 'react';

  export const SidebarComponent = (props) => {

    function calculateDivWidth() {
      const widthpx = props.isVisible ? '250px' : '0';
      const style = { width: widthpx };

      return style;
    }

    return (
      <div id="mySidenav" className="sidenav" style={calculateDivWidth()}>
        {props.children}
      </div>
    );
  };

  SidebarComponent.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
  };

  ```

  We have removed `this` and `State` interface in SidebarComponent.

- We can move the calculateDivWidth to an external resource. We create a file with name _mystyles.js_:

  ```javascript
  export function calculateDivWidth(isVisible) {
    const widthpx = isVisible ? '250px' : '0';
    const style = { width: widthpx };

    return style;
  }

  ```

  And then import and use the function in _sidebar.jsx_:

  ```jsx
  import * as React from 'react';
  import { calculateDivWidth } from './mystyles';

  export const SidebarComponent = props => (
    <div id="mySidenav" className="sidenav" style={calculateDivWidth(props.isVisible)}>
      {props.children}
    </div>
  );

  SidebarComponent.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
  };

  ```  

- But the best solution is more simple when calculateDivWidth is an small code.
As final step we add as well:

  ```jsx
  import * as React from 'react';

  export const SidebarComponent = props => (
    <div id="mySidenav" className="sidenav" style={{ width: (props.isVisible) ? '250px' : 0 }}>
      {props.children}
    </div>
  );

  SidebarComponent.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
  };

  ```
