import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad:  0.5,
    bacon:  0.4,
    cheese: 1.3,
    meat:   0.7    
};

const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.STORE_INGREDIENTS): {
            return {
                ...state,
                ingredients: action.ingredientsToStore
            }
        }
        case(actionTypes.ADD_ING): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
            }
        }
        case(actionTypes.REMOVE_ING): {
            // const updatedIngredients = {...state.ingredients};
            // updatedIngredients[action.ingType] = updatedIngredients[action.ingType] - 1 
            return {
                ...state,
                // ingredients: updatedIngredients 
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
            }
        }
        default: return state;
    }
}

export default ingredientsReducer;