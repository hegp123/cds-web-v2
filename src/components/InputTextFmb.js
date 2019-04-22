import React, { Component } from "react";
import "../css/InputTextFmb.css";

class InputTextFmb extends Component {
  render() {
    return (
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback" />
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputTextFmb;
