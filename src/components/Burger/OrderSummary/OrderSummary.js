import React  from 'react';

import Aux    from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingKey) => (
            <li key={ingKey}>
                <span style={{textTransform: "capitlaize"}}>
                    {ingKey}
                </span>
                : {props.ingredients[ingKey]}
            </li>));
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                buttonType = "Danger"
                clicked    = {props.orderCancel}>CANCEL</Button>
            <Button 
                buttonType = "Success"
                clicked    = {props.orderContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;