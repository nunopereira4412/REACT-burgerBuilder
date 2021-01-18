import * as actionTypes from '../actions/actionTypes';
import {updateObject}   from '../utility';

const initialState = {
    orders:    [],
    loading:   false,
    purchased: false,
    error:     false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ORDER_SUBMIT_SUCCESS): {
            const newOrder = {...action.orderData, id: action.id};
            return updateObject(state, {orders: state.orders.concat(newOrder), loading: false, purchased: true});
        }
        case(actionTypes.ORDER_SUBMIT_FAIL):          return updateObject(state, {loading: false, purchased: true, error:   action.error});
        case(actionTypes.WAIT_ORDER_SUBMIT_RESPONSE): return updateObject(state, {loading: true});
        case(actionTypes.STORE_FETCHED_ORDERS):       return updateObject(state, {orders: action.fetchedOrders, loading: false});
        case(actionTypes.ERROR_FETCHING_ORDERS):      return updateObject(state, {loading: false});
        case(actionTypes.WAIT_FETCH_ORDERS):          return updateObject(state, {loading: true});
        case(actionTypes.PURCHASE_INIT):              return updateObject(state, {purchased: false});
        default:                                      return state;
    };
};

export default orderReducer;