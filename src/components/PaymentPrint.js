import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import { INVOICE_PRINT, SESSION } from "../utils/Constants";
import PrintDetail from "./PrintDetail";
import { withRouter } from "react-router";

class PaymentPrint extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "" };
  }
  componentDidMount() {
    this.setState({ path: this.props.match.params.type });
  }
  goToPayment() {
    this.props.history.push("/" + this.state.path);
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
