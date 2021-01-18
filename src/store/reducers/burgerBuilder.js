import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice:  4,
    error:       false
}

const INGREDIENT_PRICES = {
    salad:  0.5,
    bacon:  0.4,
    cheese: 1.3,
    meat:   0.7    
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.STORE_INGREDIENTS): {
            return {
                ...state,
                ingredients: {
                   salad: action.ingredientsToStore.salad,
                   bacon: action.ingredientsToStore.bacon,
                   cheese: action.ingredientsToStore.cheese,
                   meat: action.ingredientsToStore.meat
                },
                totalPrice: 4,
                error: false
            }
        }
        case(actionTypes.ERROR_STORING_INGREDIENTS): {
            return {
                ...state,
                error: true
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
            return {
                ...state,
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

export default reducer;