# 13 ShouldUpdate

En este ejemplo vamos a mejorar el rendimiento de renderizado con 'shouldComponentUpdate'.

Vamos a implementar un widget de satisfacción del cliente, basado en caras o emoticonos.
Este aceptará valores en un rango de 0 a 500, y las caras tendrán un rango de valores de
0..100, 100..200, 200..300, 300..400, 400..500. Solo lanzaremos las opciones de render cuando
los valores salten al próximo o al rango previo.

Tomaremos como punto de partida el ejemplo _03 State_:

Resumen de pasos:

- Eliminar los componentes _hello_ y _nameEdit_ (limpieza de app).
- Copiar bajo el directorio _content_ los 4 png's que contienen los smileys.
- Create bajo el directorio _content_ un fichero _site.css_  y definir allí los estilos para los smileys.
- Crear un componente smily.
- Añadir al estado de la app una entrada currentValue, pasarle el cntrol y además añadirle un slider
para configurarlo. 
- Vamos a añadirle una optimización... componentshouldupdate.

## Prerrequisitos

Instalar [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) si no están previamente instalados.


## Pasos para construirlo:

- Copiar el contenido desde _03 State_ y ejecutarlo:

  ```
  npm install
  ```

- Eliminar _nameEdit.js_ y _hello.jsx_, quitarlos también de _app.jsx_:

  ```jsx
  import * as React from 'react';

  export class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div />
      );
    }
  }

  ```
- Crear una carpeta _src/content_ y copiar los 5 smiley (puedes copiarlos desde la carpeta de su 
implementación en github).

- Vamos a crear un archivo css: _src/content/site.css_ y añadimos los estilos de los smileys:

  ```css
  .very-dissatisfied {
    width:100%;
    height:80px;
    background:url('./one.png') no-repeat;;
  }

  .somewhat-dissatisfied {
    width:100%;
    height:80px;
    background:url('./two.png') no-repeat;
  }

  .neither {
    width:100%;
    height:80px;
    background:url('./three.png') no-repeat;
  }

  .somewhat-satisfied {
    width:100%;
    height:80px;
    background:url('./four.png') no-repeat;
  }

  .very-satisfied {
    width:100%;
    height:80px;
    background:url('./five.png') no-repeat;
  }
  ```

-En _webpack.config.js_ añadimos un nuevo punto de entrada _css_:

  ```javascript
  entry: [
    './main.jsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    './content/site.css',
  ],
  ```

- Necesitamos añadir un loder para manejar imágenes en _webpackconfig.js_:

  ```javascript
  {
    test: /\.(png|jpg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10000'
  },
  ```

- Vamos a crear un componente simple _faceComponent_ bajo _src_, vamos a comenzar con añadir
algo hardcodeado en el fichero _src/face.jsx_:

  ```jsx
  import * as React from 'react';
  import { } from '../src/content/site.css';
  const FaceComponent = (props) => (
    <div className="somewhat-satisfied" />
  );

  FaceComponent.propTypes = {
    level: React.PropTypes.number.isRequired,
  };

  export default FaceComponent;
  ```

- Vamos a hacer un pequeño test en _app.jsx_

  ```jsx
  import * as React from 'react';
  import FaceComponent from './face';

  export class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <FaceComponent level={100} />
        </div>
      );
    }
  }

  ```

- Vamos a añadir un check point y ejecutamos el ejemplo: Chequeamos que funciona como debe ser:

  ```
  npm start
  ```

- Ahora es tiempo de enlazar la propiedad con la cara apropiada, vamos a crear una función de estilos
para ello, en el  _face.jsx_

  ```jsx
  import * as React from 'react';
  import { } from '../src/content/site.css';
  // eslint-disable-next-line import/prefer-default-export
    const FaceComponent = (props) => {
      function setSatisfactionClass(level) {
        if (level < 100) {
          return 'very-dissatisfied';
        }

        if (level < 200) {
          return 'somewhat-dissatisfied';
        }

        if (level < 300) {
          return 'neither';
        }

        if (level < 400) {
          return 'somewhat-satisfied';
        }

        return ('very-satisfied');
      }

      return (
        <div className={setSatisfactionClass(props.level)} />
      );
    };

  FaceComponent.propTypes = {
    level: React.PropTypes.number.isRequired,
  };

  export default FaceComponent;

  ```
- En _app.jsx_ vamos a añadir una variable de estado para almacenar el nivel de
satisfacción actual, además un slider que permita que el usuario lo actualice.

  ```jsx
  import * as React from 'react';
  import FaceComponent from './face';

  export class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = { satisfactionLevel: 300 };
    }

    render() {
      return (
        <div>
          <input
            type="range"
            min="0"
            max="500"
            value={this.state.satisfactionLevel}
            onChange={event =>
              this.setState({ satisfactionLevel: parseInt(event.target.value, 10) })
            }
          />
          <br />
          <span>{this.state.satisfactionLevel}</span>
          <br />
          <FaceComponent level={this.state.satisfactionLevel} />
        </div>
      );
    }
  }

  ```

- Ejecutemos el ejemplo:

  ```
  npm start
  ```

- Añadiremos una optimización, solo lanzaremos el render cuando el nivel 
de satisfacción cambie de rango, necesitamos cambiar el componente a un componente que meneje 
el estado:

  ```jsx
 import * as React from 'react';
 import { } from '../src/content/site.css';

  class FaceComponent extends React.Component {
    setSatisfactionClass(level) {
      if (level < 100) {
        return 'very-dissatisfied';
      }

      if (level < 200) {
        return 'somewhat-dissatisfied';
      }

      if (level < 300) {
        return 'neither';
      }

      if (level < 400) {
        return 'somewhat-satisfied';
      }

      return ('very-satisfied');
    }

    shouldComponentUpdate(nextProps, nextState) {
      const rangeChange = [100, 200, 300, 400];

      let index = 0;
      let isRangeChange = false;
      while (!isRangeChange && index < rangeChange.length) {
        isRangeChange =
          (this.props.level < rangeChange[index] &&
           nextProps.level >= rangeChange[index]) ||
          (this.props.level > rangeChange[index] &&
           nextProps.level <= rangeChange[index]);

        index += 1;
      }

      return isRangeChange;
    }
    render() {
      return (
        <div className={this.setSatisfactionClass(this.props.level)} />
      );
    }
  }

  FaceComponent.propTypes = {
    level: React.PropTypes.number.isRequired,
  };

  export default FaceComponent;

  ```

- Ahora si ponemos un breakpoint en el render del faceComponent podemos ver que 
el render solo es lanzado cuando  cambiamos el rango de satisfacción (e.g. 99 to 100).

  ```
  npm start
  ```
