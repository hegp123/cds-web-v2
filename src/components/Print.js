import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";

import PrintContainer from "./PrintContainer";
import PrintDetail from "./PrintDetail";
import { AppContextProvider, AppContext } from "../context/AppContext";

import "../css/Payment.css";

class Print extends Component {
  render() {
    const typeProcess = "print";
    return (
      <AppContextProvider>
        <HeaderFmb type={typeProcess} />
        {!this.context.masterChanged ? <PrintContainer /> : <PrintDetail />}
        {!this.context.masterChanged ? <FooterFmb type={typeProcess} /> : ""}
      </AppContextProvider>
    );
  }
}

Print.contextType = AppContext;

export default Print;
