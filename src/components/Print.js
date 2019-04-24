import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import ModalAlert from "./modal/ModalAlert";

import "../css/Payment.css";

class Print extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orden: "",
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
                onClick={this.toggle}
              >
                <i class="fa fa-search" />
                {"   "}
                Buscar
              </button>
            </div>
          </div>
        </form>
        <FooterFmb type={typeProcess} />

        <ModalAlert
          isOpen={this.state.modal}
          toggle={this.toggle}
          content="El numeor de la factura es adasd asdasdas addasdasd adasdasd adssa"
        />
      </div>
    );
  }
}

export default Print;
