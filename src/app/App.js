import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "../privateRoute/PrivateRoute";

import LoginPage from "../components/Login";
import PaymentPage from "../components/Payment";
import PrintPage from "../components/Print";
import ReportPage from "../components/Report";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <PrivateRoute exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/payment" component={PaymentPage} />
          <PrivateRoute exact path="/report" component={ReportPage} />
          <PrivateRoute exact path="/print" component={PrintPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
