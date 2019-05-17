import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Feed from './Component/Feed';
import GroupFeed from './Component/GroupFeed';
import EditUser from './Component/EditUser';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/feed" component={Feed} />
        <Route path="/groups/:id" component={GroupFeed} />
        <Route path="/user/edit" component={EditUser} />
      </div>
    </Router>
  );
}

export default AppRouter;
