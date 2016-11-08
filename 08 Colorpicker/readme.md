# 08 Colorpicker



We will take a startup point sample _01 HelloReact_:

>This sample is based on the following [egghead jsbin](https://jsbin.com/qiwoxax/4/edit?html,js,output), but adding some variations.

Summary steps:

- Rename _hello.jsx_ file to _colorpicker.jsx_.
- Define the properties and state.
- Create the UI.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute `npm install`.

- Let's rename _hello.jsx_ to _colorpicker.jsx_.

- Let's rename as well the name of the component.

  ```jsx
  import * as React from 'react';

  export const ColorPicker = () => {
    return (
      <h2>Hello component !</h2>
    );
  }
  ```

- Let's create an indermediate _app.jsx_ file like we did in some previous samples:

  ```jsx
  import * as React from 'react';
  import { ColorPicker } from './colorpicker';

  export class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = { color: { red: 90, green: 50, blue: 70 } };
    }

    setColorState(newColor) {
      this.setState({ color: newColor });
    }

    render() {
      return (
        <div>
          <ColorPicker />
        </div>
      );
    }
  }

  ```

- We need to update _main.jsx_ to indicate the change

  ```jsx
  /* global document */

  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import { App } from './app';

  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );

  ```

- We are going to change as well the content of the file.
Let's start by defining only one slider to control the red component of a given color (_colorpicker.jsx_):

  ```jsx
  export const ColorPicker = (props) => (
    <div>
      <input
        type="range"
        min="0"
        max="255"
        value={props.color.red}
        onChange={event =>
          props.onColorUpdated(
            {
              red: event.target.value,
              green: props.color.green,
              blue: props.color.blue,
            }
          )
        }
      />
      { props.color.red }
    </div>
  );

  ColorPicker.propTypes = {
    color: React.PropTypes.shape({
      red: React.PropTypes.number.isRequired,
      green: React.PropTypes.number.isRequired,
      blue: React.PropTypes.number.isRequired,
    }).isRequired,
    onColorUpdated: React.PropTypes.func.isRequired,
  };
  ```

- Now it's time to update _app.jsx_ to interact with the components props.

  ```jsx
  import * as React from 'react';
  import { ColorPicker } from './colorpicker';

  export class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = { color: { red: 90, green: 50, blue: 70 } };

      this.setColorState = this.setColorState.bind(this);
    }

    setColorState(newColor) {
      this.setState({ color: newColor });
    }

    render() {
      return (
        <div>
          <span>
            Color: [
              red: {this.state.color.red},
              green: {this.state.color.green},
              blue: {this.state.color.blue}
            ]
          </span>
          <ColorPicker color={this.state.color} onColorUpdated={this.setColorState} />
        </div>
      );
    }
  }

  ```

- Let's give a try and check that we got the basics working

  ```
  npm start
  ```

- Let's complete the component by adding sliders for the green and blue options:

> Note: this will look a bit ugly, in the next sample we will refactor this to a cleaner solution

  ```jsx
  export const ColorPicker = props => (
    <div>
      <input
        type="range"
        min="0"
        max="255"
        value={props.color.red}
        onChange={event =>
          props.onColorUpdated(
            {
              red: event.target.value,
              green: props.color.green,
              blue: props.color.blue,
            }
          )
        }
      />
      { props.color.red }
      <br />
      <input
        type="range"
        min="0"
        max="255"
        value={props.color.green}
        onChange={event =>
          props.onColorUpdated(
            {
              red: props.color.red,
              green: event.target.value,
              blue: props.color.blue,
            }
          )
        }
      />
      { props.color.green }
      <br />
      <input
        type="range"
        min="0"
        max="255"
        value={props.color.blue}
        onChange={event =>
          props.onColorUpdated(
            {
              red: props.color.red,
              green: props.color.green,
              blue: event.target.value,
            }
          )
        }
      />
      { props.color.blue }
      <br />
    </div>
  );

  ```

- Let's make this a bit more visual, it would be a good idea to display a rectangle
filled with the selected color. Let's create a ColorDisplayer component (_colordisplayer.jsx_).

  ```jsx
  import * as React from 'react';

  export const ColorDisplayer = (props) => {
    // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
    // 'rgb(' + props.color.red + ', 40, 80)'
    const divStyle = {
      width: '120px',
      height: '80px',
      backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`,
    };

    return (
      <div style={divStyle} />
    );
  };

  ColorDisplayer.propTypes = {
    color: React.PropTypes.shape({
      red: React.PropTypes.number.isRequired,
      green: React.PropTypes.number.isRequired,
      blue: React.PropTypes.number.isRequired,
    }).isRequired,
  };

  ```

- And let's use it inside our App (_app.jsx_) component.

  ```jsx
  import { ColorDisplayer } from './colordisplayer';
  ```

  ```jsx
  public render() {
    return (
      <div>
        <ColorDisplayer
          color={this.state.color}
        />
        <span>
          Color: [
            red:    {this.state.color.red},
            green:  {this.state.color.green},
            blue:   {this.state.color.blue}
          ]
        </span>
        <ColorPicker
          color={this.state.color}  
          onColorUpdated={this.setColorState.bind(this)}
        />
      </div>
    );
  }
  ```

- Let's give a try and check the results

 ```
npm start
```
