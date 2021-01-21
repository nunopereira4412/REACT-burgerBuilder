import React from 'react';

import classes from './navigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigatioNitems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {   props.isLoggedIn
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authentication</NavigationItem>
        }
    </ul>
);

export default navigatioNitems;