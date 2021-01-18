import React, {Component} from 'react';
import axios              from '../../hoc/axiosOrders';

import Order              from '../../components/Order/Order';
import Spinner            from '../../components/UI/Spinner/Spinner';
import withErrorHandling  from '../../hoc/withErrorHandling';
import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        const orders = this.props.loading ? <Spinner/> : (
            this.props.orders.map(order => (
                <Order 
                    ingredients={order.ingredients} 
                    totalPrice={order.totalPrice}
                    key={order.id}/>)));

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders:  state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actionCreators.fetchOrders())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));