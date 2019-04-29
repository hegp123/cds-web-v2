import React, { Component } from "react";
import ButtonFmb from "./ButtonFmb";
import "../css/Alert.css";
import { AppContext } from "../context/AppContext";

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
        <div className="container">
          <div className="form-group text-center">
            <b>Reimpresión</b>
          </div>

          <div className="form-group">
            <div className="container">
              <div className="row">
                <div className="label-name space">
                  <b>OR No.:</b>
                  {this.context.invoice.numeroFactura}
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

PrintDetail.contextType = AppContext;

export default PrintDetail;
