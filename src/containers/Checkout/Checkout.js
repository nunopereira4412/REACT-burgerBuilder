import React, {Component, Fragment} from 'react';

import CheckoutSummary              from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route}                      from 'react-router-dom';
import App from '../../App';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';

class Checkout extends Component {
 
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        }
    };

    checkoutCancelledHandler = () => this.props.history.goBack();
    checkoutContinuedHandler = () => this.props.history.push("/checkout/contact-data");

    render() {
        return (
            <Fragment>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
            </Fragment>
        );
    }
}

export default Checkout;