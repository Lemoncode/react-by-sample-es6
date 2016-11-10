# 09 Colorpicker Refactor

In this sample we are going to review the colorpicker component we have created
and simplify it, right now we have three slider controls with many details
that make our HTML hard to read, let's componentize this scenario.

We will take a startup point sample _08 Colorpicker_:

Summary steps:

- Create a simple color slide component.
- Replace the color slider inputs with the new slider.
- Check result.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _08 ColorPicker_ and execute `npm install`.

- Let's define a ColorSliderComponent component (_colorslider.jsx_).

  ```jsx
  import * as React from 'react';

  const ColorSliderComponent = props => (
    <div>
      <input
        type="range"
        min="0"
        max="255"
        value={props.value}
        onChange={event => props.onValueUpdated(parseInt(event.target.value, 10))}
      />
      {props.value}
    </div>
  );

  ColorSliderComponent.propTypes = {
    value: React.PropTypes.number.isRequired,
    onValueUpdated: React.PropTypes.func.isRequired,
  };

  export default ColorSliderComponent;

  ```

- Let's refactor our _colorpicker.jsx_.

  ```jsx
  import * as React from 'react';
  import ColorSliderComponent from './colorslider';

  export const ColorPicker = props => (
    <div>
      <ColorSliderComponent
        value={props.color.red}
        onValueUpdated={value =>
          props.onColorUpdated(
            {
              red: value,
              green: props.color.green,
              blue: props.color.blue,
            }
          )
        }
      />
      <br />
      <ColorSliderComponent
        value={props.color.green}
        onValueUpdated={value =>
          props.onColorUpdated(
            {
              red: props.color.red,
              green: value,
              blue: props.color.blue,
            }
          )
        }
      />
      <br />
      <ColorSliderComponent
        value={props.color.blue}
        onValueUpdated={value =>
          props.onColorUpdated(
            {
              red: props.color.red,
              green: props.color.green,
              blue: value,
            }
          )
        }
      />
      <br />
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

- Let's give a try and check that everything is still working as expected.

  ```
  npm start
  ```
