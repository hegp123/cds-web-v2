import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import { withRouter } from "react-router";

import PrintContainer from "./PrintContainer";
import PrintDetail from "./PrintDetail";
import { AppContextProvider, AppContext } from "../context/AppContext";

import "../css/Payment.css";

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
    return (
      <AppContextProvider>
        <HeaderFmb type={typeProcess} />
        {!this.state.masterChanged ? (
          <PrintContainer setMasterChanged={this.setMasterChanged} />
        ) : (
          <PrintDetail setMasterChanged={this.setMasterChanged} />
        )}
        {!this.state.masterChanged ? <FooterFmb type={typeProcess} /> : ""}
      </AppContextProvider>
    );
  }
}

Print.contextType = AppContext;
Print = withRouter(Print);

export default Print;
