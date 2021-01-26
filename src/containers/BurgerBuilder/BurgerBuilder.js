import React, {useState, useEffect}  from 'react';

import axios               from '../../hoc/axiosOrders';

import Aux                 from '../../hoc/Aux';
import Burger              from '../../components/Burger/Burger';
import BuildControls       from '../../components/Burger/BuildControls/BuildControls';
import Modal               from '../../components/UI/Modal/Modal';
import OrderSummary        from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner             from '../../components/UI/Spinner/Spinner';
import withErrorHandling   from '../../hoc/withErrorHandling';

import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.storeIngredients();
        if(!props.building && props.redirectPath !== "/")
            props.setRedirectPath("/");

    }, []);

    const addIngredientHandler = (type) => {
        props.addIng(type);
        updatePurchaseState(props.ingredients);
    }

    const removeIngredientHandler = (type) => {
        props.removeIng(type);
        updatePurchaseState(props.ingredients);
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
                .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    const orderBtnClickedHandler = () => {
        if(props.isLoggedIn)
            setPurchasing(true);
        else 
            if(props.building) {
                props.setRedirectPath("/checkout");
                props.history.push("/auth");
            }   
    }

    const modalClosedHandler = () => {
        setPurchasing(false);
    }
    
    const orderCancelHandler = () => {
        setPurchasing(false);
    }

    const orderContinueHandler = () => {
        props.purchaseInit();
        props.history.push("/checkout");
    }

    const disabledInfo = {...props.ingredients};
    for(let key in disabledInfo) 
        disabledInfo[key] = disabledInfo[key] <= 0;

    let orderSummary = null;
    
    let burger = props.error ? <p>cant show ingredients</p> : <Spinner/>;
    
    if(props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients = {props.ingredients}/>
                <BuildControls 
                    addIngredient    = {addIngredientHandler}
                    removeIngredient = {removeIngredientHandler}
                    disabled         = {disabledInfo}
                    totalPrice       = {props.totalPrice}
                    purchasable      = {updatePurchaseState(props.ingredients)}
                    orderBtnClicked  = {orderBtnClickedHandler}
                    isLoggedIn       = {props.isLoggedIn}
                />
            </Aux>);
        orderSummary = (
            <OrderSummary 
                ingredients   = {props.ingredients}
                totalPrice    = {props.totalPrice}
                orderCancel   = {orderCancelHandler}
                orderContinue = {orderContinueHandler}
            />);
    }

    return (
        <Aux>
            <Modal 
                show        = {purchasing}
                modalClosed = {modalClosedHandler}
                >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ingredients:  state.bb.ingredients,
        totalPrice:   state.bb.totalPrice,
        error:        state.bb.error,
        purchased:    state.order.purchased,
        building:     state.bb.building,
        isLoggedIn:   state.auth.token != null,
        redirectPath: state.auth.redirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeIngredients: ()     => dispatch(actionCreators.storeIngredients()),
        addIng:           (type) => dispatch(actionCreators.addIng(type)),
        removeIng:        (type) => dispatch(actionCreators.removeIng(type)),
        purchaseInit:     (type) => dispatch(actionCreators.purchaseInit()),
        setRedirectPath:  (path) => dispatch(actionCreators.setRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));