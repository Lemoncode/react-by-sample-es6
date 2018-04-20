# 01 Hello React

In this sample we will create our first react component and connect it with the
DOM via react-dom.

We will take a startup point sanple _00 Boilerplate

Summary steps:

- Install react and react-dom libraries.
- Install react and react-dom typescript definitions.
- Update the index.html to create a placeholder for the react components
- Create a simple react component.
- Wire up this component by using react-dom.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _00 Boilerplate_ and execute _npm install_.

```bash
npm install
```

- Let's install react and react-dom libraries:

```bash
npm install react react-dom --save
```

- Update the [./index.html](./index.html) to create a placeholder for the react components

_[./index.html](./index.html)_
```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React + ES6 by example</title>
  </head>
  <body>
    <h1>Sample app</h1>
+    <div id="root">
+    </div>    
  </body>
</html>
```

- Create a simple react component (let's create it under a new file called _[./src/hello.jsx](./src/hello.jsx)_)

_[./src/hello.jsx](./src/hello.jsx)_
```javascript
import React from 'react';

export const HelloComponent = () =>
    <p> Hello React!</p>
```

- Wire up this component by using react-dom under _[./src/main.jsx](./src/main.jsx)_ (we have to rename this file
  from **js** to **jsx** and replace the content).

_[./src/main.jsx](./src/main.jsx)_
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {HelloComponent} from './hello.jsx';

ReactDOM.render(<HelloComponent/>, document.getElementById('root'));
```

- Modify the [./webpack.config.js](./webpack.config.js) file and change the entry point from [./src/main.js](./src/main.jsx)
to [./src/main.jsx](./src/main.jsx).

_[./webpack.config.js](./webpack.config.js)_
 ```diff
 entry: [
-   './main.js',
+   './main.jsx',
   '../node_modules/bootstrap/dist/css/bootstrap.css'
 ],
 ```

 Also you'll need to modify the first babel loader to handle jsx files.
 To handle jsx react components with webpack need to install babel-plugin-transform-runtime and babel-preset-react.

 ```
 npm install babel-preset-react --save-dev
 ```

Then in [./webpack.config.js](./webpack.config.js):

_[./webpack.config.js](./webpack.config.js)_
```javascript
 loaders: [
   {
     test: /\.jsx$/,
     loader: "babel-loader",
     exclude: /node_modules/,
   },
```

- Let's update _[./.babelrc](./.babelrc)_

_[./.babelrc](./.babelrc)_
```diff
{
  "presets": [
    [
      "env",      
      {
        "modules": false
      }
    ],
+   "react"    
  ]
}
```

- Execute the example:

 ```bash
 npm start
 ```

- Then, load http://localhost:8080/ in a browser to see the output.

 ![Browser Output](../99_readme_resources/01 HelloReact/browser_output.png "Browser Output")
