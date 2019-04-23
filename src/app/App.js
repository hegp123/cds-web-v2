import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "../privateRoute/PrivateRoute";

import PaymentPage from "../components/Payment";
import LoginPage from "../components/Login";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/payment" component={PaymentPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
