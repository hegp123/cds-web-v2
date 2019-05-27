import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import { withRouter } from "react-router";

import PrintContainer from "./PrintContainer";
import PrintDetail from "./PrintDetail";

import "../css/Payment.css";
import { INVOICE_PRINT } from "../utils/Constants";

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterChanged: false
    };
    this.setMasterChanged = this.setMasterChanged.bind(this);
  }

  setMasterChanged() {
    this.setState({ masterChanged: !this.state.masterChanged });
  }

  render() {
    const typeProcess = "print";
    let invoiceSession = JSON.parse(sessionStorage.getItem(INVOICE_PRINT));

    return (
      <div>
        <HeaderFmb type={typeProcess} />
        {!this.state.masterChanged ? (
          <PrintContainer setMasterChanged={this.setMasterChanged} />
        ) : (
          <PrintDetail
            setMasterChanged={this.setMasterChanged}
            invoice={invoiceSession}
            printer={true}
          />
        )}
        {!this.state.masterChanged ? <FooterFmb type={typeProcess} /> : ""}
      </div>
    );
  }
}

Print = withRouter(Print);

export default Print;
