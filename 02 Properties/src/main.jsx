import React from 'react';
import {render} from 'react-dom';
import {HelloComponent} from './hello.jsx';

render(
  <HelloComponent userName="John" />, 
  document.getElementById('root')
);