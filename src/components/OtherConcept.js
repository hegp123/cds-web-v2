import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import OtherConceptContainer from "./OtherConceptContainer";

class OtherConcept extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const typeProcess = "otherConcept";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <OtherConceptContainer />
        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default OtherConcept;
