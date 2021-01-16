import React from 'react';

import classes from './burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => [...Array(props.ingredients[ingredientKey])]
            .map((_, index) => <BurgerIngredient 
                                    type = {ingredientKey}
                                    key  = {ingredientKey + index}
                                />)).reduce((arr, el) => arr.concat(el), []);
    
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="breadTop"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="breadBottom"></BurgerIngredient>
        </div>
    );
};

export default burger;


