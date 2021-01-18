import * as actionTypes from './actionTypes';

import axios            from '../../hoc/axiosOrders';

const orderSubmitSuccess = (orderResponse, orderData) => {
    return {
            type: actionTypes.ORDER_SUBMIT_SUCCESS, 
            id: orderResponse,
            orderData: orderData
        };
};

const orderSubmitError = (err) => {
    return {type: actionTypes.ORDER_SUBMIT_FAIL, error: err};
};

const waitOrderSubmitResponse = () => {
    return {type: actionTypes.WAIT_ORDER_SUBMIT_RESPONSE};
};
const fetchOrdersSuccess = (fetchedData) => {
    return {
        type: actionTypes.STORE_FETCHED_ORDERS,
        fetchedOrders: fetchedData
    };
};

const fetchOrdersError = (error) => {
    return {type: actionTypes.ERROR_FETCHING_ORDERS, error: error};
};

const waitFetchOrders = () => {
    return {type: actionTypes.WAIT_FETCH_ORDERS};
};

export const purchaseInit = () => {
    return {type: actionTypes.PURCHASE_INIT};
}

export const orderSubmit = (orderData) => {
    return dispatch => {
        dispatch(waitOrderSubmitResponse());
            axios.post("orders.json", orderData)
            .then(response => {
                dispatch(orderSubmitSuccess(response.data.name, orderData))
            })
            .catch(error => orderSubmitError(error));
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(waitFetchOrders());
        axios.get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) 
                fetchedOrders.push({
                        ...res.data[key],
                        id: key
                });
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => dispatch(fetchOrdersError(error)));
    };
};
