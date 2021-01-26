import React, {useState} from 'react';

import classes from './layout.module.css';

import Aux     from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

const Layout = props => {
 
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    const sideDrawerClosedHandler = () => setShowSideDrawer(false);

    const sideDrawerToggleHandler = () => setShowSideDrawer(!showSideDrawer);

    return (
        <Aux>
            <Toolbar 
                drawerToggleClicked = {sideDrawerToggleHandler}
                isLoggedIn          = {props.isLoggedIn}
            />
            <SideDrawer 
                sideDrawerClosed = {sideDrawerClosedHandler}
                open             = {showSideDrawer}
                isLoggedIn       = {props.isLoggedIn}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);