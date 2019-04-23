import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import PaymentContainer from "./PaymentContainer";

import "../css/Payment.css";

class Payment extends Component {
  render() {
    const typeProcess = "payment";
    return (
      <div>
        <HeaderFmb type={typeProcess} />

        <PaymentContainer />

        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default Payment;
