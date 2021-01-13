import React, {Component} from 'react';
import axios              from '../../../hoc/axiosOrders';

import Button             from '../../../components/UI/Button/Button';
import classes            from './contactData.module.css';
import Spinner            from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipCode: "",
            country: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        this.setState({loading: true});
        event.preventDefault();
        // alert("You Continue!");
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: "testName",
                email: "test.@test.com",
                adress: {
                    street: "testStreet",
                    zipcode: "12345",
                    country: "testCountry"
                },
            },
            deliveryMethod: "fastest"
        }
        axios.post("orders.json", order)
            // .then(response => this.setState({purchasing: false, loading: false}))
            // .catch(error => this.setState({purchasing: false, loading: false}));
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(error => this.setState({loading: false}));
    }
    
    render() {
        console.log(this.props);
        let form = this.state.loading ? <Spinner/> : (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
                    <Button buttonType="Success" clicked={(event) => this.orderHandler(event)}>ORDER</Button>
            </form>
        );

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;