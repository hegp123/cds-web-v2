import React, { Component } from "react";
import "../css/ButtonFmb.css";

class ButtonFmb extends Component {
  render() {
    const disabled = this.props.disabled;
    return (
      <button
        type="button"
        className="buttonFmb btn btn-primary btn-lg btn-block"
        disabled={!disabled}
        onClick={this.props.onClick}
      >
        <i className={this.props.icon} />
        {"   "}
        {this.props.name}
      </button>
    );
  }
}

export default ButtonFmb;
