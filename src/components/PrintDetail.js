import React, { Component } from "react";
import ButtonFmb from "./ButtonFmb";
import "../css/Alert.css";
import { numberFilter } from "../utils/Utils";
import { SESSION } from "../utils/Constants";

class PrintDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sesion: {},
      modal: false
    };
  }

  componentDidMount() {
    var valueSession = JSON.parse(sessionStorage.getItem(SESSION));
    this.setState({ sesion: valueSession });
  }

  componentDidUpdate() {
    if (!this.props.printer) {
      this.reprint(false);
    }
  }

  reprint(mostrarFactura) {
    var reimp = "";
    if (mostrarFactura) {
      reimp = " - REIMPRESION";
    }
    var factura =
      "\r\n \r\n \r\n" +
      "Fundacion delamujer \r\n" +
      "NIT. 901.128.535-8 \r\n" +
      "Fecha: " +
      this.props.invoice.fecha +
      " \r\n" +
      (this.props.invoice.agencia !== undefined
        ? "AG: " + this.props.invoice.agencia + " \r\n"
        : "") +
      "\r\n" +
      "ORDEN DE RECIBO POR CDS NO.: \r\n" +
      this.props.invoice.numeroFactura +
      "\r\n" +
      "\r\n" +
      (mostrarFactura ? reimp + "\r\n" : "") +
      "Cliente: " +
      this.props.invoice.cliente +
      " \r\n" +
      "Documento identidad: " +
      numberFilter(this.props.invoice.cedulaCliente) +
      "\r\n";

    if (this.props.invoice.codigoCredito !== undefined) {
      factura +=
        "Concepto: Abono Credito " +
        this.props.invoice.codigoCredito +
        " \r\n \r\n";
    }

    factura +=
      "Valor pagado: $" + numberFilter(this.props.invoice.total) + ",00 \r\n";

    factura +=
      "------ \r\n" +
      "Total: $" +
      numberFilter(this.props.invoice.total) +
      ",00 \r\n \r\n";

    if (
      this.props.invoice.mensaje !== "" &&
      this.props.invoice.mensaje !== null &&
      this.props.invoice.mensaje !== undefined
    ) {
      factura +=
        "Mensaje: " +
        this.props.invoice.mensaje +
        " \r\n" +
        this.state.sesion.mensajeImpresion +
        " \r\n \r\n" +
        "PROMOCION: " +
        this.state.sesion.mensajeGlobal +
        " \r\n \r\n" +
        "CODIGO DE SEGURIDAD: " +
        this.props.invoice.codigoSeguridad +
        " \r\n" +
        "\r\n \r\n \r\n";
    } else {
      factura +=
        (this.state.sesion.mensajeImpresion !== undefined
          ? this.state.sesion.mensajeImpresion
          : "") +
        " \r\n \r\n" +
        "PROMOCION: " +
        this.state.sesion.mensajeGlobal +
        " \r\n \r\n" +
        "CODIGO DE SEGURIDAD: " +
        this.props.invoice.codigoSeguridad +
        " \r\n" +
        "\r\n \r\n \r\n";
    }
    alert(factura);
    /* useDefaultPrinter();
    qz.append(factura);
    qz.print();*/
  }

  returnAgencia() {
    if (
      this.props.invoice.agencia !== null &&
      this.props.invoice.agencia !== "" &&
      this.props.invoice.agencia !== undefined
    ) {
      return (
        <div className="row">
          <div className="label-detail space">
            <b>Agencia:</b>
            {this.props.invoice.agencia}
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  returnCodigoCredito() {
    if (
      this.props.invoice.codigoCredito !== null &&
      this.props.invoice.codigoCredito !== "" &&
      this.props.invoice.codigoCredito !== undefined
    ) {
      return (
        <div className="row">
          <div className="label-detail space">
            <b>Crédito:</b>
            {this.props.invoice.codigoCredito}
          </div>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    const typeProcess = "print";
    return (
      <div>
        <div className="container">
          <div className="form-group text-center">
            <b>{this.props.printer ? "Reimpresión" : ""}</b>
          </div>

          <div className="form-group">
            <div className="container">
              <div className="row">
                <div className="label-name space">
                  <b>OR No.:</b>
                  {this.props.invoice.numeroFactura}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Fecha:</b>
                  {this.props.invoice.fecha}
                </div>
              </div>
              {this.returnAgencia()}
              <div className="row">
                <div className="label-detail space">
                  <b>Cliene:</b>
                  {this.props.invoice.cliente}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Cédula:</b>
                  {this.props.invoice.cedulaCliente}
                </div>
              </div>
              {this.returnCodigoCredito()}
              <div className="row">
                <div className="label-detail space">
                  <b>Total:</b>
                  {"$" + numberFilter(this.props.invoice.total) + ",00"}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="label-detail space">
                  {this.state.sesion.mensajePantalla !== "" &&
                  this.state.sesion.mensajePantalla !== null
                    ? this.state.sesion.mensajePantalla
                    : ""}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  {this.props.invoice.mensaje !== "" &&
                  this.props.invoice.mensaje !== null &&
                  this.props.invoice.mensaje !== undefined ? (
                    <div>
                      <b>Mensaje:</b> {this.props.invoice.mensaje}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Promoción:</b>
                  {this.state.sesion.mensajeGlobal}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="form-group">
            {this.props.printer ? (
              <ButtonFmb
                name="Imprimir"
                disabled={false}
                icon="fas fa-print"
                onClick={this.reprint.bind(this, true)}
              />
            ) : (
              <div />
            )}
          </div>
          <div className="form-group">
            <ButtonFmb
              name="Cerrar"
              disabled={false}
              icon="fas fa-times"
              onClick={this.props.setMasterChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PrintDetail;
