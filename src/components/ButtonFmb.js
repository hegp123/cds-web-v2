import React, { Component } from "react";
import "../css/ButtonFmb.css";

class ButtonFmb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const disabled = this.props.disabled;
    return (
      <button
        type="submit"
        className="buttonFmb btn btn-primary btn-lg btn-block"
        disabled={!disabled}
      >
        <i class="fa fa-unlock" />
        {"   "}
        {this.props.name}
      </button>
    );
  }
}

export default ButtonFmb;
