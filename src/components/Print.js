import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";

import PrintContainer from "./PrintContainer";

import { AppContextProvider } from "../context/AppContext";

import "../css/Payment.css";

class Print extends Component {
  render() {
    const typeProcess = "print";
    return (
      <AppContextProvider>
        <HeaderFmb type={typeProcess} />
        <PrintContainer />
        <FooterFmb type={typeProcess} />
      </AppContextProvider>
    );
  }
}

export default Print;
