import * as React from 'react';
import PropTypes from 'prop-types';

export const SidebarComponent = props => (
  <div id="mySidenav" className="sidenav" style={{ width: (props.isVisible) ? '250px' : 0 }}>
    {props.children}
  </div>
);

SidebarComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.element,
};
