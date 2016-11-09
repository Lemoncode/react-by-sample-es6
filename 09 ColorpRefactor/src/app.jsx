import * as React from 'react';
import { ColorPicker } from './colorpicker';
import { ColorDisplayer } from './colordisplayer';

import Foobar from './foobar';

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
        <Foobar onFoobar={this.setColorState} />
        <ColorDisplayer
          color={this.state.color}
        />
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
