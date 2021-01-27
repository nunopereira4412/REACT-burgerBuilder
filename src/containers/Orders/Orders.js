import React, {useEffect} from 'react';
import axios              from '../../hoc/axiosOrders';

import Order              from '../../components/Order/Order';
import Spinner            from '../../components/UI/Spinner/Spinner';
import withErrorHandling  from '../../hoc/withErrorHandling';
import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';

const Orders = props => {

    const {fetchOrders} = props;

    useEffect(() => {
        fetchOrders(props.token, props.userId);
    }, [fetchOrders]);

    const orders = props.loading ? <Spinner/> : (
        props.orders.map(order => (
            <Order 
                ingredients={order.ingredients} 
                totalPrice={order.totalPrice}
                key={order.id}
            />)
        )
    );

    return (
        <div>
            {orders}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading:state.order.loading,
        token:  state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));