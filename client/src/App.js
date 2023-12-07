import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import ContractSigningPage from "./components/ContractSigningPage";
import ContractConstructPage from "./components/ContractConstructPage";
import UserDetailPage from "./components/UserDetailPage";

// Place holder for user
const user = {
  name: "User Name test",
  email: "User Email test",
};

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/user" component={UserDetailPage} />
          <Route
            exact
            path="/contract/construct"
            component={ContractConstructPage}
          />
          <Route exact path="/contract/sign" component={ContractSigningPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
