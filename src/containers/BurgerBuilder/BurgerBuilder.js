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

const INGREDIENT_PRICES = {
    salad:  0.5,
    bacon:  0.4,
    cheese: 1.3,
    meat:   0.7    
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        console.log("[BurgerBuilder.js] constructor");
    }

    state = {
        ingredients: null,
        totalPrice:  4,
        purchasable: false,
        purchasing:  false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log("[BurgerBuilder.js] componentDidMount");
        axios.get("https://react-burger-builder-26adf-default-rtdb.firebaseio.com/ingredients.json")
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => this.setState({error: error}));
    }

    addIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedPrice           = this.state.totalPrice + INGREDIENT_PRICES[type];
        const updatedIngredients     = {...this.state.ingredients};
        updatedIngredients[type]     = updatedIngredientCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;    
        const updatedTotalPrice      = this.state.totalPrice - INGREDIENT_PRICES[type];
        const updatedIngredients     = {...this.state.ingredients};
        updatedIngredients[type]     = updatedIngredientCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedTotalPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingredient) => ingredients[ingredient])
                .reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sum > 0});
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

    orderContinueHandler = () => {
        // // alert("You Continue!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     totalPrice: this.state.totalPrice,
        //     customer: {
        //         name: "testName",
        //         adress: {
        //             street: "testStreet",
        //             zipcode: "12345",
        //             country: "testCountry"
        //         },
        //         email: "test.@test.com"
        //     },
        //     deliveryMethod: "fastest"
        // }
        // axios.post("orders.json", order)
        //     .then(response => this.setState({purchasing: false, loading: false}))
        //     .catch(error => this.setState({purchasing: false, loading: false}));

        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) 
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = null;
        
        let burger = this.state.error ? <p>cant show ingredients</p> : <Spinner/>;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        addIngredient    = {this.addIngredientHandler}
                        removeIngredient = {this.removeIngredientHandler}
                        disabled         = {disabledInfo}
                        totalPrice       = {this.state.totalPrice}
                        purchasable      = {this.state.purchasable}
                        orderBtnClicked  = {this.orderBtnClickedHandler}
                    />
                </Aux>);
            orderSummary = (
                <OrderSummary 
                    ingredients   = {this.state.ingredients}
                    totalPrice    = {this.state.totalPrice}
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
                <Route path="/checkout" component={Checkout}/>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandling(BurgerBuilder, axios);