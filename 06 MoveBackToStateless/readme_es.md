# 06 MoveBackToStateless

En el ejemplo [05](../05%20Refactor/) aprendimos cómo eliminar el estado de un control secundario solo para tener un gobierno de estado claro.

Es hora de hacer un poco de limpieza, simplifique el componente _`nameEdit`_  y muévalo como un componente sin estado.

Tomaremos una muestra de punto de inicio _[05 Refactor](../05%20Refactor/)_.

Pasos resumidos:

- Actualice _[nameEdit.jsx](./src/nameEdit.jsx)_, transfiéralo a un componente sin estado y agregue los métodos en línea.

## Requisitos previos

Instale [Node.js y npm](https://nodejs.org/en/) (v6.6.0 o más reciente) si aún no están instalados en su computadora.

> Verifique que esté ejecutando al menos los nodos v6.x.x y npm 3.x.x ejecutando `node -v` y` npm -v` en una ventana de terminal / consola. Las versiones anteriores pueden producir errores.

## Pasos para construirlo

- Copie el contenido de _[05 Refactor](../05%20Refactor/)_ y ejecute `npm install`.

- Actualice _[nameEdit.jsx](./src/nameEdit.jsx)_, transfiéralo a un componente sin estado y agregue los métodos en línea. Debería verse así:

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

-- export class NameEditComponent extends React.Component {
++ export const NameEditComponent = (props) => {
--  constructor(props) {
--    super(props);
--  }

--  render() {
    return (
      <div>
        <label>Update Name:</label>
        <input 
--        value={this.props.editingUserName}      
++        value={props.editingUserName}
--        onChange={(e) => this.props.onEditingNameUpdated(e.target.value)}
++        onChange={(e) => props.onEditingNameUpdated(e.target.value)} 
        />
        <input 
          type="submit" 
          value="Change" 
          className="btn btn-default"
--        onClick={this.props.onNameUpdateRequest}         
++        onClick={props.onNameUpdateRequest} 
        />
      </div>
    );
-- }
}

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
```

Ahora, podemos verificar el ejemplo que se ejecuta desde la línea de comando `npm start` y abrir [http://localhost:8080](http://localhost:8080).

Podemos mejorar el ejemplo si extraemos la función `onChange={(e) => props.onEditingNameUpdated(e.target.value)}`.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

export const NameEditComponent = (props) => {
++    const onChangeName = (e) => {
++      props.onEditingNameUpdated(e.target.value)
++    }
      return (
        <div>
          <label>Update Name:</label>
          <input 
            value={props.editingUserName}
--          onChange={(e) => props.onEditingNameUpdated(e.target.value)} 
++          onChange={onChangeName} 
          />
          <input 
            type="submit"
            value="Change" 
            className="btn btn-default" 
            onClick={props.onNameUpdateRequest} 
          />
        </div>
      );
  }

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
```

> Esta solución es más limpia que la anterior, pero ineficiente. La función se genera cada vez que nos desplazamos por el código.

Vamos un paso adelante.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

++    const onChangeName = (props) => (e) => {
++      props.onEditingNameUpdated(e.target.value)
++    }

export const NameEditComponent = (props) => {
--    const onChangeName = (e) => {
--      props.onEditingNameUpdated(e.target.value)
--    }
      return (
        <div>
          <label>Update Name:</label>
          <input 
            value={props.editingUserName}
--          onChange={onChangeName} 
++          onChange={onChangeName(props)} 
          />
          <input 
            type="submit"
            value="Change" 
            className="btn btn-default" 
            onClick={props.onNameUpdateRequest} 
          />
        </div>
      );
  }

NameEditComponent.propTypes = {
  editingUserName: PropTypes.string.isRequired,
  onEditingNameUpdated: PropTypes.func.isRequired,
  onNameUpdateRequest: PropTypes.func.isRequired
};
```

> Esta solución le permite ejecutar la función solo una vez.

Finalmente, podemos verificar el ejemplo que se ejecuta desde la línea de comando `npm start` y abrir [http://localhost:8080](http://localhost:8080).