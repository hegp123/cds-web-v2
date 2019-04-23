import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";

import "../css/Payment.css";

class Payment extends Component {
  render() {
    const typeProcess = "payment";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <div className="container, containerFmb">
          <div className="page-header">
            <h1>Sticky footer with fixed navbar</h1>
          </div>
          <p className="lead">
            Pin a fixed-height footer to the bottom of the viewport in desktop
            browsers with this custom HTML and CSS. A fixed navbar has been
            added with <code>padding-top: 60px;</code> on the{" "}
            <code>body > .container</code>.
          </p>
          <p>
            Back to <a href="../sticky-footer">the default sticky footer</a>{" "}
            minus the navbar.
          </p>
        </div>

        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default Payment;
