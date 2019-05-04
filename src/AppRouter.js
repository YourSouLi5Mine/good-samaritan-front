import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './Component/SignUp';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" component={SignUp} />
      </div>
    </Router>
  );
}

export default AppRouter;
