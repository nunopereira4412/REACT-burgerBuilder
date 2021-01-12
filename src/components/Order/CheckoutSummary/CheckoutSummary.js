import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkoutSummary.module.css';

const checkoutSummary = (props) => {
   
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you like it!</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
                <Button 
                    buttonType="Danger" 
                    clicked={props.checkoutCancelled}>CANCEL
                </Button>
                <Button 
                    buttonType="Success" 
                    clicked={props.checkoutContinued}>SUCCESS
                </Button>
            </div>
        </div>   
    );
};
 
export default checkoutSummary;