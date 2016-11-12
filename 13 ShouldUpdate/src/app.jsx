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
