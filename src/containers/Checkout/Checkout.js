import React, {Component, Fragment} from 'react';

import CheckoutSummary              from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route}                      from 'react-router-dom';
import ContactData                  from './ContactData/ContactData';

class Checkout extends Component {
 
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        const ingredientsFromSearch = {};
        const query = new URLSearchParams(this.props.location.search);
        let price;
        for (let param of query.entries()) {
            if(param[0] === "totalPrice")
                price = param[1];
            else ingredientsFromSearch[param[0]] = +param[1];       
        }
        this.setState({
            ingredients: ingredientsFromSearch,
            totalPrice: price
        });
    }

    checkoutCancelledHandler = () => this.props.history.goBack();
    checkoutContinuedHandler = () => this.props.history.push("/checkout/contact-data");

    render() {
        return (
            <Fragment>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + "/contact-data"} 
                    render={(props) => <ContactData 
                                    ingredients={this.state.ingredients}
                                    totalPrice={this.state.totalPrice}
                                    {...props}/>}/>
            </Fragment>
        );
    }
}

export default Checkout;