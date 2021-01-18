import React, {Component, Fragment} from 'react';

import CheckoutSummary              from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect}            from 'react-router-dom';
import ContactData                  from './ContactData/ContactData';
import Spinner                      from '../../components/UI/Spinner/Spinner';

import {connect}                    from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => this.props.history.goBack();
    checkoutContinuedHandler = () => this.props.history.push("/checkout/contact-data");

    render() {
        const summary = !this.props.ingredients ? <Redirect to="/"/> : (
            this.props.loading ? <Spinner/> : (
                <Fragment>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.url + "/contact-data"} 
                        component={ContactData} />
                </Fragment>
            )
        )
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice:  state.bb.totalPrice,
        loading:     state.order.loading
    };
};

export default connect(mapStateToProps)(Checkout);