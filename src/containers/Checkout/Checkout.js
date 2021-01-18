import React, {Component, Fragment} from 'react';

import CheckoutSummary              from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route}                      from 'react-router-dom';
import ContactData                  from './ContactData/ContactData';

import {connect}                    from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => this.props.history.goBack();
    checkoutContinuedHandler = () => this.props.history.push("/checkout/contact-data");

    render() {
        console.log("\n\nSAFDSAFD\n\n", this.props.ingredients);
        return (
            <Fragment>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + "/contact-data"} 
                    component={ContactData} />
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice: state.bb.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout);