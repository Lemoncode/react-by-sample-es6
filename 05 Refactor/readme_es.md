# 05 Refactor

En la muestra anterior, establecimos un valor de nombre de usuario inicial, ¿qué pasaría si esperamos que este valor provenga de, por ejemplo, una solicitud AJAX o si podría cambiar a tiempo? El enfoque actual no funcionará.

Podemos pensar en dos posibles soluciones:

- La primera idea que nos viene a la mente es implementar una combinación: recibimos a través de _props_ el valor del nombre actual, luego tenemos un _state_ con el valor de edición actual ... ¿qué inconvenientes podríamos encontrar? Tenemos que escuchar en el `componentWillReceiveProps` para cualquier cambio en el control de nombre de usuario principal y reemplazar nuestro estado, terminamos con un gobierno mixto.

- La segunda idea es configurar dos propiedades, el control principal contendrá _`userName`_ y _`editingUsername`_, cada vez que el usuario haga clic en el botón para reemplazar el nombre notificará al control principal y se reemplazará el contenido de _`userName`_ con el contenido de _`editingUsername`_. Si _`userName`_ es actualizado por cualquier otro tercero (por ejemplo, ajax callback) también actualizará _`editingUsername`_.

Tomaremos como punto de partida muestra _[04 Callback](../04%20Callback/)_:

Pasos resumidos:

- Actualice _[nameEdit.jsx](./src/nameEdit.jsx)_ para solicitar el nuevo _`editingUsername`_, y elimínelo del _state_.

- Actualizar _[app.jsx](./src/app.jsx)_ para mantener la nueva propiedad de edición en el estado, pasarla a los elementos secundarios, controlar y realizar la actualización adecuada en el evento de devolución de llamada desde el control secundario.

## Requisitos previos

Instale [Node.js and npm](https://nodejs.org/en/) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copie el contenido de _[04 Callback](../04%20Callback/)_ y ejecute `npm install`.

- Actualice _[nameEdit.jsx](./src/nameEdit.jsx)_ para solicitar el nuevo _`editingUsername`_, y elimínelo del estado.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

export class NameEditComponent extends React.Component {
  constructor(props) {
    super(props);
--  this.state = {
--   editingName: this.props.initialUserName,
--  };

--  this.onChange = this.onChange.bind(this);
--  this.onNameSubmit = this.onNameSubmit.bind(this);
  }

-- onChange(event) {
--   this.setState({ editingName: event.target.value });
-- }
    
-- onNameSubmit() {
--    this.props.onNameUpdated(this.state.editingName);
-- }

  render() {
    return (
      <div>
--      <label htmlFor="editingName">Update Name:</label>      
++      <label>Update Name:</label>
        <input 
--        value={this.state.editingName}        
++        value={this.props.editingUserName}
--        onChange={this.onChange}
++        onChange={(e) => this.props.onEditingNameUpdated(e.target.value)} 
--        id="editingName"
        />
        <input 
          type="submit" 
          value="Change" 
          className="btn btn-default"
--        onClick={this.onNameSubmit}
++        onClick={this.props.onNameUpdateRequest} 
        />
      </div>
    );
  }
}

NameEditComponent.propTypes = {
-- userName: PropTypes.string.isRequired,
++ editingUserName: PropTypes.string.isRequired,
-- onNameUpdated: PropTypes.func,
++ onEditingNameUpdated: PropTypes.func.isRequired,
++ onNameUpdateRequest: PropTypes.func.isRequired
};
```

- Actualizar _[app.jsx](./src/app.jsx)_ para mantener la nueva propiedad de edición en el estado, pasarla al control secundario y realizar la actualización adecuada en el evento de devolución de llamada desde el control secundario.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

export class App extends React.Component {
  constructor(props) {
    super(props);

--  this.state = {
--    userName: 'defaultUserName',
--  };
++  const defaultUserName = 'defaultUserName';

--  this.setUsernameState = this.setUsernameState.bind(this);
++  this.state = {
++    userName: defaultUserName,
++    editingUserName: defaultUserName
++  };
  }

-- setUsernameState(newName) {
++ setUsernameState() {
    this.setState({
--    userName: newName
++    userName: this.state.editingUserName
    });
  }

++ updateEditingName(editingName) {
++  this.setState({editingUserName: editingName});
++ }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
--        initialUserName="Javier Cansado"
--        onNameUpdated={this.setUsernameState}        
++        editingUserName={this.state.editingUserName}
++        onEditingNameUpdated={this.updateEditingName.bind(this)}
++        onNameUpdateRequest={this.setUsernameState.bind(this)} />
      </div>
    );
  }
}
```

Finalmente podemos verificar que la muestra está funcionando como _[04 Devolución de llamada](../04%20Callback/)_ ejecutándose desde la línea de comando `npm start` y abriendo [http://localhost:8080](http://localhost:8080).