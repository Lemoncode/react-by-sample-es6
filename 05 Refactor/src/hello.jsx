import React from 'react';
import PropTypes from 'prop-types';

export const HelloComponent = (props) =>
    <h2>Hello user: {props.userName}!</h2>;

HelloComponent.propTypes = {
    userName: PropTypes.string.isRequired
};

