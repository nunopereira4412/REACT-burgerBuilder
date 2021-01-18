import React, {Component}   from 'react';

import axios               from '../../hoc/axiosOrders';

import Aux                 from '../../hoc/Aux';
import Burger              from '../../components/Burger/Burger';
import BuildControls       from '../../components/Burger/BuildControls/BuildControls';
import Modal               from '../../components/UI/Modal/Modal';
import OrderSummary        from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner             from '../../components/UI/Spinner/Spinner';
import withErrorHandling   from '../../hoc/withErrorHandling';

import {Route}             from 'react-router-dom';
import Checkout            from '../Checkout/Checkout';

import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        console.log("[BurgerBuilder.js] constructor");
    }

    state = {
        purchasing:  false
    }

    componentDidMount() {
        console.log("[BurgerBuilder.js] componentDidMount");
        this.props.storeIngredients();
    }

    addIngredientHandler = (type) => {
        this.props.addIng(type);
        this.updatePurchaseState(this.props.ingredients);
    }

    removeIngredientHandler = (type) => {
        this.props.removeIng(type);
        this.updatePurchaseState(this.props.ingredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
                .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    orderBtnClickedHandler = () => {
        this.setState({purchasing: true});
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false});
    }
    
    orderCancelHandler = () => {
        this.setState({purchasing: false});
    }

    orderContinueHandler = () => this.props.history.push("/checkout");

    render() {
        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo) 
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;
        
        let burger = this.props.error ? <p>cant show ingredients</p> : <Spinner/>;
        
        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls 
                        addIngredient    = {this.addIngredientHandler}
                        removeIngredient = {this.removeIngredientHandler}
                        disabled         = {disabledInfo}
                        totalPrice       = {this.props.totalPrice}
                        purchasable      = {this.updatePurchaseState(this.props.ingredients)}
                        orderBtnClicked  = {this.orderBtnClickedHandler}
                    />
                </Aux>);
            orderSummary = (
                <OrderSummary 
                    ingredients   = {this.props.ingredients}
                    totalPrice    = {this.props.totalPrice}
                    orderCancel   = {this.orderCancelHandler}
                    orderContinue = {this.orderContinueHandler}
                />);
        }

        return (
            <Aux>
                <Modal 
                    show        = {this.state.purchasing}
                    modalClosed = {this.modalClosedHandler}
                    >
                    {orderSummary}
                </Modal>
                < Route path="/checkout" component={Checkout}/>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.bb.ingredients,
        totalPrice:  state.bb.totalPrice,
        error:       state.bb.error
    }
};
// const mapStateToProps = state => {
//     return {
//         ingredients: state.bb.ingredients,
//         totalPrice:  state.bb.totalPrice,
//         error:       state.bb.error
//     }
// };

const mapDispatchToProps = dispatch => {
    return {
        storeIngredients: ()     => dispatch(actionCreators.storeIngredients()),
        addIng:           (type) => dispatch(actionCreators.addIng(type)),
        removeIng:        (type) => dispatch(actionCreators.removeIng(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));