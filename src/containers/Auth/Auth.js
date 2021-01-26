import React, {useState}  from 'react';

import Button              from '../../components/UI/Button/Button';
import Input               from '../../components/UI/Input/Input';
import classes             from './auth.module.css';
import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';
import Spinner             from '../../components/UI/Spinner/Spinner';   
import {Redirect}          from 'react-router-dom';

import {checkValidity}     from '../../shared/utility';

const Auth = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "E-mail"
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
     
    const [isSignUp, setIsSignUp] = useState(true);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthMode = () => setIsSignUp(!isSignUp);

    const controlsArray = [];

    for(let controlName in controls) {
        controlsArray.push({
            id: controlName,
            config: controls[controlName], 
        });
    }

    const form = (
        <form onSubmit={submitHandler}>
            {controlsArray.map(el => (
                <Input 
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    changed={(event) => inputChangedHandler(event, el.id)}
                    isValid={el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}/>
            ))}
            <Button buttonType="Success">SUBMIT</Button>
        </form>
    );

    const authContent = props.loading ? <Spinner/> : (
        <div>
            <h4>Enter your email and password</h4>
            {form}
            <Button 
                buttonType="Danger"
                clicked={switchAuthMode}>SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
            </Button>
        </div>
    );

    const errorMessage = props.errorMessage ? props.errorMessage : null;

    const redirectTo   = props.isLoggedIn ? <Redirect to={props.redirectPath}/> : null;

    return (
        <div className={classes.Auth}>
            {redirectTo}
            {authContent}
            {errorMessage}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        errorMessage:   state.auth.errorMessage,
        loading:        state.auth.loading,
        isLoggedIn:     state.auth.token !== null,
        redirectPath:   state.auth.redirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);