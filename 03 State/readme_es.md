# 03 State

En esta muestra, presentaremos un concepto básico de React, manejo del estado.

En este caso proporcionaremos un nombre de usuario predeterminado pero dejaremos que el usuario lo actualice.

Tomaremos como punto de partida la muestra _[02 Propiedades](../02%20Properties/) _:


## Pasos resumidos:

- Cree un componente _`App`_ que mantendrá el estado, este estado contendrá el nombre de usuario actual (por defecto asignado al valor _"defaultUserName"_).
Este componente _`App`_ representará el componente _`Hello`_. Al principio, crearemos un componente state simple _`App`_.
- Actualizar el archivo _[main.jsx](./src/main.jsx)_ para incluir nuestro componente _`App`_.
- Cambie el componente _`App`_ a un componente de clase de estado para mantener el estado _`userName`_.
- Crea un componente _`NameEdit`_ para que el usuario pueda cambiar el nombre de usuario. Esto cambiará el _`App`_ estado usando una función de _`App`_.
- Verifica que todo esté funcionando correctamente.

## Prerrequisitos

Instale [Node.js y npm](https://nodejs.org) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copia el contenido de _[02 Propiedades](../02%20Properties/)_ y ejecuta:

```bash
npm install
```

- Vamos a crear un componente _`App`_ bajo un nuevo archivo llamado _[app.jsx](./src/app.jsx)_ (este componente mostrará el _`Hello`_ componente).

_[app.jsx](./src/app.jsx)_
```jsx
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
    render() {
      return (
        <div>
          <HelloComponent userName="John" />
        </div>
      );
    }
}
```

- Actualicemos _[main.jsx](./src/main.jsx)_ sólo para usar el componente _`App`_  que hemos creado recientemente.

_[main.jsx](./src/main.jsx)_
```diff
import React from 'react';
import {render} from 'react-dom';
-- import {HelloComponent} from './hello.jsx';
++ import { App } from './app';

render(
--  <HelloComponent userName="John" />,
++  <App />, 
    document.getElementById('root')
);
```

- Ahora podemos verificar que las cosas sigan funcionando como se esperaba (nada roto hasta el momento).

```bash
npm start
```

- Es hora de volver a visitar _[app.jsx](./src/app.jsx)_, ya que queremos almacenar el nombre del usuario y dejar que el usuario lo actualice, vamos a mover este componente a un componente con estado de clase y definir un estado, que incluye _`userName`_ y pasa este valor al componente _`Hello`_.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
++    constructor(props) {
++      super(props);

++      this.state = {
++        userName: 'defaultUserName',
++      };
++    }

    render() {
      return (
        <div>
--          <HelloComponent userName="John" />
++          <HelloComponent userName={this.state.userName} />
        </div>
      );
    }
  }

  ```

- Nuevamente, podemos hacer una verificación rápida para probar que todo está funcionando como se esperaba.

```bash
npm start
```

- Ahora es el momento de crear un componente _`NameEdit`_, este componente permitirá al usuario actualizar su nombre de usuario y lo notificará con una devolución de llamada al control principal siempre que se actualice _`userName`_.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export const NameEditComponent = (props) => (
  <div>
    <label htmlFor="userName">Update Name:</label>
    <input id="userName" value={props.userName} onChange={props.onChange} />
  </div>
);

NameEditComponent.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
```

- En el archivo _[app.jsx](./src/app.jsx)_, agreguemos una función para configurar el estado en _`userName`_.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import { HelloComponent } from './hello';

export class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userName: 'defaultUserName',
    };

++  this.setUsernameState = this.setUsernameState.bind(this);
  }

++ setUsernameState(event) {
++    // If the state gets more complex we should use object.assign
++    this.setState({
++    userName: event.target.value,
++  });
++ }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
++      <NameEditComponent
++        userName={this.state.userName}
++        onChange={this.setUsernameState}
++      />
      </div>
    );
  }
}

  ```

- Finalmente probemos la muestra final.

```bash
npm start
```
