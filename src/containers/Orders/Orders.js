import React, {Component} from 'react';
import axios              from '../../hoc/axiosOrders';

import Order              from '../../components/Order/Order';
import Spinner            from '../../components/UI/Spinner/Spinner';
import withErrorHandling  from '../../hoc/withErrorHandling';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                const fetchedOrders = []; 
                for(let key in res.data) 
                fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                console.log(fetchedOrders);
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false}); 
            })
    }

    render() {

        const orders = this.state.loading ? <Spinner/> : (
            this.state.orders.map(order => (
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

export default withErrorHandling(Orders, axios);