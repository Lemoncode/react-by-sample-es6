import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SidebarComponent = (props) => (
  <div id="mySidenav" className="sidenav" style={{ width: (props.isVisible) ? '20rem' : '0' }}>
    {props.children}
  </div>
);

SidebarComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.element,
};