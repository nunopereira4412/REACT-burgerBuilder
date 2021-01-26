import React, {useState}   from 'react';
import axios               from '../../../hoc/axiosOrders';

import Button              from '../../../components/UI/Button/Button';
import classes             from './contactData.module.css';
import Input               from '../../../components/UI/Input/Input';

import {connect}           from 'react-redux';
import * as actionCreators from '../../../store/actions/actionsIndex';
import withErrorHandling   from '../../../hoc/withErrorHandling';

import {Redirect}          from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';


const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
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
    });
    
    const [isValid, setIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = [];
        for(let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }

        const order = {
            ingredients: props.ingredients,
            totalPrice:  props.totalPrice.toFixed(2),
            orderData:   {...formData},
            userId:      props.userId
        }
         
        props.orderSubmit(order, props.token);
    }

    const inputChangedHandler = (event, id) => {

        const updatedFormElement = updateObject(orderForm[id], {
            ...orderForm[id],
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[id].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderForm, {
            [id]: updatedFormElement
        })

        let formValidity = true;
        for(let id in updatedOrderForm)
            formValidity = formValidity && updatedOrderForm[id].valid;

        setOrderForm(updatedOrderForm);
        setIsValid(formValidity);
    }

    const formElements = [];

    for(let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key], 
        });
    }

    let form = props.purchased ? <Redirect to="/"/> : (
        <form onSubmit={orderHandler}>
            {formElements.map(el => (
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
            <Button buttonType="Success" disabled={!isValid}>ORDER</Button>
        </form>
    )

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice:  state.bb.totalPrice,
        purchased:   state.order.purchased,
        error:       state.order.error,
        token:       state.auth.token,
        userId:      state.auth.userId
    };
};


const mapDispatchToProps = dispatch => {
    return {
        orderSubmit: (orderData, token) => dispatch(actionCreators.orderSubmit(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(ContactData, axios))