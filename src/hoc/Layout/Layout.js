import React, {Component} from 'react';

import classes from './layout.module.css';

import Aux     from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}));
    }

    render() {
        return (
            <Aux>
                {/* <div>Toolbar, Side Drawer, Backdrop</div> */}
                <Toolbar 
                    drawerToggleClicked = {this.sideDrawerToggleHandler}
                    isLoggedIn          = {this.props.isLoggedIn}
                />
                <SideDrawer 
                    sideDrawerClosed = {this.sideDrawerClosedHandler}
                    open             = {this.state.showSideDrawer}
                    isLoggedIn       = {this.props.isLoggedIn}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);