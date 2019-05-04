import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </div>
    </Router>
  );
}

export default AppRouter;
