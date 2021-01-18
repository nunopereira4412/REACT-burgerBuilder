import * as actionTypes from '../actions/actionTypes';
import {updateObject}   from '../utility';

const initialState = {
    ingredients: null,
    totalPrice:  4,
    error:       false
};

const INGREDIENT_PRICES = {
    salad:  0.5,
    bacon:  0.4,
    cheese: 1.3,
    meat:   0.7    
};

const storeIngredients = (state, action) => {
    const updatedState = {
        ingredients: {
            salad:  action.ingredientsToStore.salad,
            bacon:  action.ingredientsToStore.bacon,
            cheese: action.ingredientsToStore.cheese,
            meat:   action.ingredientsToStore.meat   
        },
        totalPrice: 4,
        error:      false
    };
    return updateObject(state, updatedState);
}

const addIngredient = (state, action) => {
    const updatedIngredient  = {[action.ingType]: state.ingredients[action.ingType] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState       = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
    };
    return updateObject(state, updatedState); 
}

const removeIngredient = (state, action) => {
    const updatedIngredient  = {[action.ingType]: state.ingredients[action.ingType] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState       = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
    };
    return updateObject(state, updatedState); 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.STORE_INGREDIENTS):         return storeIngredients(state, action);
        case(actionTypes.ERROR_STORING_INGREDIENTS): return updateObject(state, {error: true});
        case(actionTypes.ADD_ING):                   return addIngredient(state, action);
        case(actionTypes.REMOVE_ING):                return removeIngredient(state, action);           
        default:                                     return state;
    };
};

export default reducer;