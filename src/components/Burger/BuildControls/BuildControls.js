import React from 'react';

import classes from './buildControls.module.css';

import BuildControl from './BuildControl/ BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "bacon", type: "bacon"},
    {label: "cheese", type: "cheese"},
    {label: "meat", type: "meat"}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((control) => (
            <BuildControl 
                key              = {control.label} 
                label            = {control.label}
                addIngredient    = {() => props.addIngredient(control.type)}
                removeIngredient = {() => props.removeIngredient(control.type)}
                disabled         = {props.disabled[control.type]}
            />
        ))}
        <button 
            className = {classes.OrderButton}
            disabled  = {!props.purchasable}
            onClick   = {props.orderBtnClicked}
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;