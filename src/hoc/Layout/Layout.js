import React, {Component} from 'react';

import classes from './layout.module.css';

import Aux     from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    sideDrawerClosed = {this.sideDrawerClosedHandler}
                    open             = {this.state.showSideDrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;