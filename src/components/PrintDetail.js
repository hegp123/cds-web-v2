import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";

class PrintDetail extends Component {
  render() {
    const typeProcess = "print";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <div className="container">
          <div className="row, text-center">
            <b>Reimpresion</b>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintDetail;
