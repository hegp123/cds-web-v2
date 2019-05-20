import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import { INVOICE_PRINT, SESSION } from "../utils/Constants";
import PrintDetail from "./PrintDetail";
import { withRouter } from "react-router";

class PaymentPrint extends Component {
  goToPayment() {
    this.props.history.push("/payment");
  }
  render() {
    const typeProcess = "paymentPrint";
    let invoiceSession = JSON.parse(sessionStorage.getItem("invoicePrint"));

    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <PrintDetail
          setMasterChanged={this.goToPayment.bind(this)}
          invoice={invoiceSession}
          printer={false}
        />
      </div>
    );
  }
}
PaymentPrint = withRouter(PaymentPrint);
export default PaymentPrint;
