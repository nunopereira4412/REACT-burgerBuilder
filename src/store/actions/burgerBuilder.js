import * as actionTypes from './actionTypes';
import axios            from '../../hoc/axiosOrders';      

const storeIngredientsAux = (ingredients) => {
    return {type: actionTypes.STORE_INGREDIENTS, ingredientsToStore: ingredients}
}

const errorStoringIngredients = () => {
    return {type: actionTypes.ERROR_STORING_INGREDIENTS}
}

export const storeIngredients = () => {
    return dispatch => {
        axios.get("https://react-burger-builder-26adf-default-rtdb.firebaseio.com/ingredients.json")
            .then(response => dispatch(storeIngredientsAux(response.data)))
            .catch(error => dispatch(errorStoringIngredients()));        
    }
};

export const addIng = (type) => {
    return {type: actionTypes.ADD_ING, ingType: type};
};

export const removeIng = (type) => {
    return {type: actionTypes.REMOVE_ING, ingType: type};
};



