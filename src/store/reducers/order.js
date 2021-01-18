import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ORDER_SUBMIT_SUCCESS): {
            return {
                ...state,
                loading: false
            }
        }
        case(actionTypes.ORDER_SUBMIT_FAIL): {
            return {
                ...state,
                loading: false
            }
        }
        default: return state;
    }
};

export default orderReducer;