import * as React from 'react';

const Foobar = props => (
  <input
    onChange={props.onFoobar}
    type="text"
    value="234"
  />
);

Foobar.propTypes = {
  onFoobar: React.PropTypes.func.isRequired,
};


export default Foobar;
