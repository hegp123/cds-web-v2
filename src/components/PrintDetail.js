import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import ButtonFmb from "./ButtonFmb";
import "../css/Alert.css";

class PrintDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: this.props.invoice
    };
  }

  render() {
    const typeProcess = "print";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <div className="container">
          <div className="form-group text-center">
            <b>Reimpresión</b>
          </div>

          <div className="form-group">
            <div className="container">
              <div className="row">
                <div className="label-name space">
                  <b>OR No.:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Fecha:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Agencia:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Cliene:</b>
                </div>
              </div>

              <div className="row">
                <div className="label-detail space">
                  <b>Cédula:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Crédito:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Total</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="form-group">
            <ButtonFmb name="Imprimir" disabled="true" icon="fas fa-print" />
          </div>
          <div className="form-group">
            <ButtonFmb name="Cerrar" disabled="true" icon="fas fa-times" />
          </div>
        </div>
      </div>
    );
  }
}

export default PrintDetail;
