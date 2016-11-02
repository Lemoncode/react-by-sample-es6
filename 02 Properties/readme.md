# 02 Properties

In this sample we will introduce a basic React concept, handling properties.

We will add a _userName_ property and display it in the _Hello_ component.

We will take as a starting point sample __01 Hello React__:

Summary steps:

- Create a property in our _Hello_ stateless component that will hold the _userName_ value.

- Let's inform it from our parent control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 HelloReact_ and execute `npm install`.

- Let's update __hello.jsx__ in order to reflect the new property added (_userName_) and display it using interpolation (`{props.userName}`):

 ```javascript
import React from 'react';

export const HelloComponent = (props) => {
  return (
    <h2>Hello user: {props.userName}!</h2>
  );
}
 ```

- Let's update __main.jsx__ and inform the _userName_ propery value:

 ```javascript
import React from 'react';
import {render} from 'react-dom';
import {HelloComponent} from './hello';

render(
  <HelloComponent userName="John" />
  , document.getElementById('root')
);
 ```
