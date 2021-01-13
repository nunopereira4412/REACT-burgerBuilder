import React from 'react';

import classes  from './order.module.css';

const order = (props) => {

    const ingredients = [];
    
    for(let ing in props.ingredients)
        ingredients.push(
            <span 
                key={ing}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    border: "1px solid #aaa",
                    padding: "0 5px",
                    margin: "5px"
                }}>
                {ing}({props.ingredients[ing]})
            </span>);

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {(Number.parseFloat(props.totalPrice)).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;