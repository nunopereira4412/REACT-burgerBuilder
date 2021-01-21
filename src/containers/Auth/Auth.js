import React, {Component}  from 'react';

import Button              from '../../components/UI/Button/Button';
import Input               from '../../components/UI/Input/Input';
import classes             from './auth.module.css';
import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';
import Spinner             from '../../components/UI/Spinner/Spinner';   
import {Redirect}          from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp: true
    }


    checkValidity(value, rules) {
        let isValid = true;

        if(rules) { //setting an empty validation object to "deliveryMethod" in the state also works 
            if(rules.required)
                isValid = value.trim() !== "" && isValid;
            if(rules.minLength)
                isValid = value.length >= rules.minLength && isValid;
            if(rules.maxLength)
                isValid = value.length <= rules.maxLength && isValid;
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    };

    render() {
        const controls = [];

        for(let controlName in this.state.controls) {
            controls.push({
                id: controlName,
                config: this.state.controls[controlName], 
            });
        }
        const form = (
            <form onSubmit={this.submitHandler}>
                {controls.map(el => (
                    <Input 
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        isValid={el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}/>
                ))}
                <Button buttonType="Success">SUBMIT</Button>
            </form>
        );

        const authContent = this.props.loading ? <Spinner/> : (
            <div>
                <h4>Enter your email and password</h4>
                {form}
                <Button 
                    buttonType="Danger"
                    clicked={this.switchAuthMode}>SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
                </Button>
            </div>
        );

        const errorMessage = this.props.errorMessage ? this.props.errorMessage : null;

        const redirectTo   = this.props.isLoggedIn ? <Redirect to={this.props.redirectPath}/> : null;

        return (
            <div className={classes.Auth}>
                {redirectTo}
                {errorMessage}
                {authContent}
            </div>
        );
    }
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