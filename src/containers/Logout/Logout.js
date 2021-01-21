import React, {Component} from 'react';

import {connect}           from 'react-redux';
import * as actionCreators from '../../store/actions/actionsIndex';
import {Redirect}          from 'react-router-dom'; 

class Logout extends Component {

    componentDidMount = () => {
        this.props.logout();
        this.props.clearOrders();
    }

    render() {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout:      () => dispatch(actionCreators.logout()),
        clearOrders: () => dispatch(actionCreators.clearOrders())
    }
}

export default connect(null, mapDispatchToProps)(Logout);