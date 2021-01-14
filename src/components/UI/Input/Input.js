import React from 'react';

import classes from './input.module.css';

const input = (props) => {

    let inputElement = null;

    switch(props.elementType) {
        case("input"):
            inputElement = <input 
                className={classes.InputElement}  
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>;
            break;
        case("textarea"):
            inputElement = <textarea 
                className={classes.InputElement} 
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>;
            break;
        case("select"):
            inputElement = (
                <select 
                    className={classes.InputElement} 
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>))}
                </select>);
            break;
        default:
            <input className={classes.InputElement} {...props.elementConfig}></input>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;