import * as actionTypes from './actionTypes';

import axios            from '../../hoc/axiosOrders';

const orderSubmitSuccess = (orderResponse) => {
    return {type: actionTypes.ORDER_SUBMIT_SUCCESS, response: orderResponse};
};

const orderSubmitFail = () => {
    return {type: actionTypes.ORDER_SUBMIT_FAIL};
};

export const orderSubmit = (orderData) => {
    return dispatch => {
        console.log(orderData);
        axios.post("orders.json", orderData)
            .then(response => {
                dispatch(orderSubmitSuccess(response.data))
            })
            .catch(error => orderSubmitFail());
    };
};