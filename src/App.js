import React, {useEffect, Suspense} from 'react';
import {Route, Switch, Redirect}    from 'react-router-dom';

import Layout                       from './hoc/Layout/Layout';
import BurgerBuilder                from './containers/BurgerBuilder/BurgerBuilder';
import Logout                       from './containers/Logout/Logout';

import {connect}                    from 'react-redux';
import * as actionCreators          from './store/actions/actionsIndex';

const Orders   = React.lazy(() => import('./containers/Orders/Orders'));
const Auth     = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const App = props => {

  useEffect(() => {
    props.checkAuthState();
  }, []);

  let routes = (
    <Switch>
      <Route 
        path="/auth" 
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
              <Auth/>
          </Suspense>
        )}
      />
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );

  if(props.isLoggedIn) 
    routes = (
      <Switch>
        <Route 
          path="/checkout" 
          render={() => (
          <Suspense fallback={<div>Loading...</div>}>
              <Checkout/>
          </Suspense>
          )}
        />
        <Route 
          path="/orders" 
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
                <Orders/>
            </Suspense>
          )}
        />
        <Route 
          path="/auth" 
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
                <Auth/>
            </Suspense>
          )}
        />
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
