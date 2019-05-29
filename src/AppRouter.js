import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Feed from './Component/Feed';
import GroupFeed from './Component/GroupFeed';
import EditUser from './Component/EditUser';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <AuthenticatedRoute path="/feed" component={Feed} />
        <AuthenticatedRoute path="/groups/:id" component={GroupFeed} />
        <AuthenticatedRoute path="/user/edit" component={EditUser} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

const NoMatch = ({ location }) => (
  <div>
    <h1><code>Error 404 Page not found!</code></h1>
  </div>
)

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    document.cookie.split('=')[1] ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default AppRouter;
