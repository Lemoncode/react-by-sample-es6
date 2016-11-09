import * as React from 'react';

export const SidebarComponent = props => (
  <div id="mySidenav" className="sidenav" style={{ width: (props.isVisible) ? '250px' : 0 }}>
    {props.children}
  </div>
);

SidebarComponent.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element,
};
