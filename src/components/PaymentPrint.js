import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import { INVOICE_PRINT, SESSION } from "../utils/Constants";
import PrintDetail from "./PrintDetail";
import { withRouter } from "react-router";

class PaymentPrint extends Component {
  render() {
    const typeProcess = "payment";
    let invoiceSession = JSON.parse(sessionStorage.getItem("invoicePrint"));

    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <PrintDetail setMasterChanged={() => {}} invoice={invoiceSession} />
      </div>
    );
  }
}
PaymentPrint = withRouter(PaymentPrint);
export default PaymentPrint;
