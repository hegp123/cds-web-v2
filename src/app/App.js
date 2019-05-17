import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "../privateRoute/PrivateRoute";

import LoginPage from "../components/Login";
import PaymentPage from "../components/Payment";
import PrintPage from "../components/Print";
import ReportPage from "../components/Report";
import PrintDetailPage from "../components/PrintDetail";
import PaymentPrint from "../components/PaymentPrint";
import axios from "axios";

axios.interceptors.request.use(
  request => {
    document.body.classList.add("loading-indicator");

    return request;
  },
  error => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  error => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/payment" component={PaymentPage} />
            <PrivateRoute exact path="/report" component={ReportPage} />
            <PrivateRoute exact path="/print" component={PrintPage} />
            <PrivateRoute exact path="/paymentPrint" component={PaymentPrint} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
