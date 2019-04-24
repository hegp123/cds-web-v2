import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";

import "../css/Payment.css";

class Print extends Component {
  render() {
    const typeProcess = "report";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default Print;
