import React from 'react';

import classes from './button.module.css';

const button = (props) => (
    <button 
        className = {[classes.Button, classes[props.buttonType]].join(" ")}
        onClick   = {props.clicked}
        disabled  = {props.disabled}
    >
        {props.children}
    </button>
);

export default button;  