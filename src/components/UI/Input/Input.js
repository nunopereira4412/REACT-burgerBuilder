import React from 'react';

import classes from './input.module.css';

const input = (props) => {

    let inputElement = null;
    let inputClasses = [classes.Input];
    let validationError = null;

    if(props.touched && props.shouldValidate && !props.isValid) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch(props.elementType) {
        case("input"):
            inputElement = <input 
                className={inputClasses.join(" ")}  
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>;
            break;
        case("textarea"):
            inputElement = <textarea 
                className={inputClasses.join(" ")} 
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>;
            break;
        case("select"):
            inputElement = (
                <select 
                    className={inputClasses.join(" ")} 
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
            <input className={inputClasses.join(" ")} {...props.elementConfig}></input>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;