# 02 Propiedades

En esta demo, presentaremos un concepto básico de React, manejo de propiedades.

Agregaremos a la propiedad _userName_ y la mostraremos en el componente _Hello_.

Tomaremos como punto de partida la muestra __[01 Hello React](../01%20HelloReact/)__:

Pasos resumidos:

- Cree una propiedad en nuestro componente sin estado _Hello_ que contendrá el valor _userName_.

- Informarlo desde nuestro control padre.


## Prerrequisitos

Instale [Node.js and npm](https://nodejs.org/en/) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copie el contenido de _01 HelloReact_ y ejecute `npm install`.

- Eliminar el archivo __[main.js](./src/main.js)__. Nuestra configuración de **webpack** solo reconocerá uno de los dos y puede haber un conflicto. ¡¡¡Recuerda!!! Nunca debe haber dos archivos con el mismo nombre de entrada.

- Actualicemos __[hello.jsx](./src/hello.jsx)__ para reflejar la nueva propiedad agregada (_userName_) y mostrarla mediante la interpolación (`{props.userName}`):

_[hello.jsx](./src/hello.jsx)_
```diff
import React from 'react';

-- export const HelloComponent = () =>
++ export const HelloComponent = (props) =>
--     <p> Hello React!</p>
++     <h2>Hello user: {props.userName}!</h2>
```

- Actualicemos __[main.jsx](./src/main.jsx)__ e informemos el valor de propiedad _userName_:

_[main.jsx](./src/main.jsx)_
 ```diff
-- const personToGreet = "ES6";
-- const messageToDisplay = `Hello ${personToGreet}!`;

-- document.write(messageToDisplay);

++ import React from 'react';
++ import {render} from 'react-dom';
++ import {HelloComponent} from './hello';

++ render(
++   <HelloComponent userName="John" />
++   , document.getElementById('root')
++ );
```

En este ejemplo, solo usaremos el método `render` de React-DOM, por lo que solo lo importaremos (` import {render} from 'react-dom'; `).

Ahora modificaremos el __[hello.jsx](./src/hello.jsx)__ para verificar que **propiedades** se adhieren a un contrato determinado (en este caso, la propiedad `Username` es de tipo string y requerida)

(Podemos ampliar la información aquí: [https://github.com/facebook/prop-types](https://github.com/facebook/prop-types))

_[hello.jsx](./src/hello.jsx)_
```diff
import React from 'react';
++ import PropTypes from 'prop-types';

export const HelloComponent = (props) =>
     <h2>Hello user: {props.userName}!</h2>

++ HelloComponent.propTypes = {
++     userName: PropTypes.string.isRequired
++ };
```

**Importante**: no olvidar importar el componente que lo administra, `import PropTypes from 'prop-types';`.


- Ejecuta el ejemplo:

 ```bash
 npm run build
 ```

Para generar la carpeta dist, y su contenido, y

 ```bash
 npm start
 ```

- Luego, carga http://localhost:8080/ en un navegador para ver la salida.


