import React, {Fragment} from 'react';

import CheckoutSummary   from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';
import ContactData       from './ContactData/ContactData';
import Spinner           from '../../components/UI/Spinner/Spinner';

import {connect}         from 'react-redux';

const Checkout = props => {

    const checkoutCancelledHandler = () => props.history.goBack();
    const checkoutContinuedHandler = () => props.history.push("/checkout/contact-data");

    const summary = !props.ingredients 
        ? <Redirect to="/"/> 
        : (
            props.loading 
                ? <Spinner/> 
                : (
                    <Fragment>
                        <CheckoutSummary 
                            ingredients={props.ingredients}
                            checkoutCancelled={checkoutCancelledHandler}
                            checkoutContinued={checkoutContinuedHandler}/>
                        <Route 
                            path={props.match.url + "/contact-data"} 
                            component={ContactData} />
                    </Fragment>
                 )
        );
          
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice:  state.bb.totalPrice,
        loading:     state.order.loading
    };
};

export default connect(mapStateToProps)(Checkout);