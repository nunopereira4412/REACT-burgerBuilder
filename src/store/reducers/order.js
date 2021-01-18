import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ORDER_SUBMIT_SUCCESS): {
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        }
        case(actionTypes.ORDER_SUBMIT_FAIL): {
            return {
                ...state,
                loading: false,
                purchased: true,
                error:   action.error
            }
        }
        case(actionTypes.WAIT_ORDER_SUBMIT_RESPONSE): {
            return {
                ...state,
                loading: true
            }
        }
        case(actionTypes.STORE_FETCHED_ORDERS): {
            return {
                ...state,
                orders: action.fetchedOrders,
                loading: false
            }
        }
        case(actionTypes.ERROR_FETCHING_ORDERS): {
            return {
                ...state,
                loading: false
            }
        }
        case(actionTypes.WAIT_FETCH_ORDERS): {
            return {
                ...state,
                loading: true
            }
        }
        case(actionTypes.PURCHASE_INIT): {
            return {
                ...state,
                purchased: false
            }
        }
        
        default: return state;
    }
};

export default orderReducer;