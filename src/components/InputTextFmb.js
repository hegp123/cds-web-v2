import React, { Component } from "react";
import "../css/InputTextFmb.css";

class InputTextFmb extends Component {
  render() {
    const icon = `${this.props.icon}  form-control-feedback`;
    console.log(icon);
    return (
      <div className="form-group has-icon">
        <span className={icon} />
        <input
          type={this.props.type}
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputTextFmb;
