import React           from 'react';

import classes         from './sideDrawer.module.css';

import Logo            from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop        from '../../UI/Backdrop/Backdrop';
import Aux             from '../../../hoc/Aux';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) attachedClasses = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            {/* pra tirar o backdrop é fazer media query para min width 500px*/}
            <Backdrop classeName={classes.Backdrop} show={props.open} clicked={props.sideDrawerClosed}/>
            <div className={attachedClasses.join(" ")}>
                {/* <Logo height="11%"/> */}
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isLoggedIn={props.isLoggedIn}/>
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;