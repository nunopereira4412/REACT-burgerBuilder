import React, {Component}  from 'react';
import axios               from '../../../hoc/axiosOrders';

import Button              from '../../../components/UI/Button/Button';
import classes             from './contactData.module.css';
import Spinner             from '../../../components/UI/Spinner/Spinner';
import Input               from '../../../components/UI/Input/Input';

import {connect}           from 'react-redux';
import * as actionCreators from '../../../store/actions/actionsIndex';
import withErrorHandling   from '../../../hoc/withErrorHandling';

import {Redirect}          from 'react-router-dom';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: "4",
                    maxLength: "4"
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: "fastest",
                validation: {}, //checking for "rules" in checkValidity also works
                valid: "true"
            }
        },
        isValid: false
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
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = [];
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice.toFixed(2),
            orderData: {...formData}
        }
         
        this.props.orderSubmit(order);
    }

    inputChangedHandler = (event, id) => {
        let updatedOrderForm = this.state.orderForm;
        let updatedFormElement = updatedOrderForm[id];
        updatedFormElement.value = event.target.value;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;         
        updatedOrderForm[id] = updatedFormElement;

        let formValidity = true;
        for(let formElement in updatedOrderForm)
            formValidity = formValidity && updatedOrderForm[formElement].valid;

        console.log("AFTER " + formValidity);    
        this.setState({orderForm: updatedOrderForm, isValid: formValidity});
    }

    render() {

        const formElements = [];

        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key], 
            });
        }

        let form = this.props.purchased ? <Redirect to="/"/> : (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => (
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
                <Button buttonType="Success" disabled={!this.state.isValid}>ORDER</Button>
            </form>
        )

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice:  state.bb.totalPrice,
        purchased:   state.order.purchased,
        error:       state.order.error
    };
};


const mapDispatchToProps = dispatch => {
    return {
        orderSubmit: (orderData) => dispatch(actionCreators.orderSubmit(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(ContactData, axios));
// export default connect(mapStateToProps, mapDispatchToProps)(ContactData);