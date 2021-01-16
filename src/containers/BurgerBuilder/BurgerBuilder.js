import React, {Component} from 'react';

import axios from '../../hoc/axiosOrders';

import Aux               from '../../hoc/Aux';
import Burger            from '../../components/Burger/Burger';
import BuildControls     from '../../components/Burger/BuildControls/BuildControls';
import Modal             from '../../components/UI/Modal/Modal';
import OrderSummary      from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner           from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling';

import {Route}           from 'react-router-dom';
import Checkout          from '../Checkout/Checkout';

import {connect}         from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        console.log("[BurgerBuilder.js] constructor");
    }

    state = {
        purchasing:  false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log("[BurgerBuilder.js] componentDidMount");
        axios.get("https://react-burger-builder-26adf-default-rtdb.firebaseio.com/ingredients.json")
            .then(response => this.props.storeIngredients(response.data))
            .catch(error => this.setState({error: error}));
    }

    addIngredientHandler = (type) => {
        this.props.incIng(type);
        this.updatePurchaseState(this.props.ingredients);
    }

    removeIngredientHandler = (type) => {
        this.props.decIng(type);
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
        
        let burger = this.state.error ? <p>cant show ingredients</p> : <Spinner/>;
        
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

        if(this.state.loading) orderSummary = <Spinner/>;

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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeIngredients: (ingredients) => dispatch({type: actionTypes.STORE_INGREDIENTS, ingredientsToStore: ingredients}),
        incIng:           (type) => dispatch({type: actionTypes.ADD_ING, ingType: type}),
        decIng:           (type) => dispatch({type: actionTypes.REMOVE_ING, ingType: type}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));