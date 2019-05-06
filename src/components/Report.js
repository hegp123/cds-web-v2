import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import ReportContainer from "./ReportContainer";

class Report extends Component {
  render() {
    const typeProcess = "report";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <ReportContainer />
        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default Report;
