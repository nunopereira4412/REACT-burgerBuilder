import React, {Component}  from 'react';
import {Route, Switch, Redirect}     from 'react-router-dom';

import Layout              from './hoc/Layout/Layout';
import BurgerBuilder       from './containers/BurgerBuilder/BurgerBuilder';
import Checkout            from './containers/Checkout/Checkout';
import Orders              from './containers/Orders/Orders';
import Auth                from './containers/Auth/Auth';
import Logout              from './containers/Logout/Logout';

import {connect}           from 'react-redux';
import * as actionCreators from './store/actions/actionsIndex';

class App extends Component {

  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
      </Switch>
    );
    
    if(this.props.isLoggedIn) 
      routes = (
        <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/"/>
          </Switch>
      );

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actionCreators.checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
