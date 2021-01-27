import React, {
           useState, 
           useEffect, 
           useCallback
        }                  from 'react';
      
import {
          useSelector, 
          useDispatch
        }                  from 'react-redux';

import axios               from '../../hoc/axiosOrders';

import Aux                 from '../../hoc/Aux';
import Burger              from '../../components/Burger/Burger';
import BuildControls       from '../../components/Burger/BuildControls/BuildControls';
import Modal               from '../../components/UI/Modal/Modal';
import OrderSummary        from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner             from '../../components/UI/Spinner/Spinner';
import withErrorHandling   from '../../hoc/withErrorHandling';

import * as actionCreators from '../../store/actions/actionsIndex';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const ingredients  = useSelector(state => state.bb.ingredients);
    const totalPrice   = useSelector(state => state.bb.totalPrice);
    const error        = useSelector(state => state.bb.error);
    const building     = useSelector(state => state.bb.building);
    const isLoggedIn   = useSelector(state => state.auth.token != null);
    
    const dispatch = useDispatch();
    
    // on storeIngredients, dispatch isnt needed as dependency because react makes sure that it wont change 
    const storeIngredients = useCallback(() => dispatch(actionCreators.storeIngredients()), []);
    const addIng           = (type)         => dispatch(actionCreators.addIng(type));
    const removeIng        = (type)         => dispatch(actionCreators.removeIng(type));
    const purchaseInit     = ()             => dispatch(actionCreators.purchaseInit());
    const setRedirectPath  = (path)         => dispatch(actionCreators.setRedirectPath(path));

    useEffect(() => storeIngredients(), [storeIngredients]);

    const addIngredientHandler = type => {
        addIng(type);
        updatePurchaseState(ingredients);
    }

    const removeIngredientHandler = (type) => {
        removeIng(type);
        updatePurchaseState(ingredients);
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
                .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    const orderBtnClickedHandler = () => {
        if(isLoggedIn)
            setPurchasing(true);
        else 
            if(building) {
                setRedirectPath("/checkout");
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
        purchaseInit();
        props.history.push("/checkout");
    }

    const disabledInfo = {...ingredients};
    for(let key in disabledInfo) 
        disabledInfo[key] = disabledInfo[key] <= 0;

    let orderSummary = null;
    
    let burger = error ? <p>cant show ingredients</p> : <Spinner/>;
    
    if(ingredients) {
        burger = (
            <Aux>
                <Burger ingredients = {ingredients}/>
                <BuildControls 
                    addIngredient    = {addIngredientHandler}
                    removeIngredient = {removeIngredientHandler}
                    disabled         = {disabledInfo}
                    totalPrice       = {totalPrice}
                    purchasable      = {updatePurchaseState(ingredients)}
                    orderBtnClicked  = {orderBtnClickedHandler}
                    isLoggedIn       = {isLoggedIn}
                />
            </Aux>);
        orderSummary = (
            <OrderSummary 
                ingredients   = {ingredients}
                totalPrice    = {totalPrice}
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

export default withErrorHandling(BurgerBuilder, axios);