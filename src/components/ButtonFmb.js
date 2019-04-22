import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ButtonFmb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      color: "#FFD100",
      backgroundColor: "#630448",
      borderColor: "#630448"
    };
    const disabled = this.props.disabled;
    return (
      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        style={divStyle}
        disabled={!disabled}
      >
        <div>
          <i class="fa-lock" />
        </div>

        {this.props.name}
      </button>
    );
  }
}

export default ButtonFmb;
