import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";

import "../css/Payment.css";

class Print extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orden: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let valueText = e.target.value;

    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    return this.state.orden.length > 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.orden);
  }

  render() {
    const typeProcess = "print";
    return (
      <div>
        <HeaderFmb type={typeProcess} />

        <form className="container" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">
                Orden de Recibo No.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <InputTextFmb
                type="number"
                icon="fa fa-search"
                name="orden"
                placeholder="Escriba aquí el No. de factura"
                value={this.state.orden}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <button
                type="button"
                className="buttonFmb btn btn-primary btn-lg btn-block"
                data-toggle="modal"
                data-target="#myModal"
              >
                <i class="fa fa-search" />
                {"   "}
                Buscar
              </button>
            </div>
          </div>
        </form>
        <FooterFmb type={typeProcess} />

        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">Modal body..</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  {" "}
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Print;
