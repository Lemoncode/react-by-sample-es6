import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SidebarComponent = (props) => {
    const sidebarStyle = {
        width: (props.isVisible) ? '20rem' : '0',
    };

    return (
        <div id="mySidenav" className="sidenav" style={sidebarStyle}>
            <span>Basic side bar, first steps</span>
        </div>
    );
};

SidebarComponent.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};