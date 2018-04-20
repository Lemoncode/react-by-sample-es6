# 01 Hello React

En esta muestra, crearemos nuestro primer componente de react y lo conectaremos con el
DOM a través de react-dom.

Tomaremos un punto de inicio sanple _[00 Boilerplate/](./../00%20Boilerplate/)_

Pasos resumidos:

- Instalar react y react-dom.
- Instalar definiciones de react y react-dom typescript.
- Actualice index.html para crear un marcador de posición para react component
- Crea un componente de react simple.
- Conecte este componente usando react-dom.

## Requisitos previos

Instale [Node.js y npm](https://nodejs.org/en/) (v6.6.0) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal/ consola. Las versiones anteriores pueden producir errores.

## Steps to build it

- Copie el contenido de _[00 Boilerplate/](./../00%20Boilerplate/)_ y ejecute `npm install`.

```bash
npm install
```

- Instalemos react y react-dom:

```bash
npm install react react-dom --save
```

- Actualice el [./index.html](./index.html) para crear un marcador para los componentes de react.

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

- Crea un componente de reacción simple (vamos a crearlo bajo un nuevo archivo llamado _[./src/hello.jsx](./src/hello.jsx)_)

_[./src/hello.jsx](./src/hello.jsx)_
```javascript
import React from 'react';

export const HelloComponent = () =>
    <p> Hello React!</p>
```

- Alinee este componente usando react-dom en _[./src/main.jsx](./src/main.jsx)_ (tenemos que cambiar el nombre de este archivo
  de **js** a **jsx** y reemplazar el contenido).

_[./src/main.jsx](./src/main.jsx)_
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {HelloComponent} from './hello.jsx';

ReactDOM.render(<HelloComponent/>, document.getElementById('root'));
```

- Modifique el archivo [./webpack.config.js](./webpack.config.js) y cambie el punto de entrada de [./src/main.js](./src/main.jsx)
a [./src/main.jsx](./src/main.jsx).

_[./webpack.config.js](./webpack.config.js)_
 ```diff
 entry: [
-   './main.js',
+   './main.jsx',
   '../node_modules/bootstrap/dist/css/bootstrap.css'
 ],
 ```
 
También deberá modificar el primer cargador de babel para manejar los archivos **jsx**.
Para manejar **jsx**, los componentes de reacción con webpack necesitan instalar babel-plugin-transform-runtime y babel-preset-react.

 ```
 npm install babel-preset-react --save-dev
 ```

Entonces en[./webpack.config.js](./webpack.config.js):

_[./webpack.config.js](./webpack.config.js)_
```javascript
 loaders: [
   {
     test: /\.jsx$/,
     loader: "babel-loader",
     exclude: /node_modules/,
   },
```

- Actualicemos _[./.babelrc](./.babelrc)_

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

- Ejecute el ejemplo:

 ```bash
 npm start
 ```

- Luego, carga [http://localhost:8080/](http://localhost:8080/) en un navegador para ver la salida.

 ![Salida del navegador](../99_readme_resources/01 HelloReact/ browser_output.png)