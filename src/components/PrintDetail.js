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

  reprint(mostrarFactura) {
    var reimp = "";
    var sesion = JSON.parse(sessionStorage.getItem("sesion"));
    console.log(sesion);
    if (mostrarFactura) {
      reimp = " - REIMPRESION";
    }
    var factura =
      "\r\n \r\n \r\n" +
      "Fundacion delamujer \r\n" +
      "NIT. 901.128.535-8 \r\n" +
      "Fecha: " +
      this.context.invoice.fecha +
      " \r\n" +
      "AG: " +
      this.context.invoice.agencia +
      " \r\n" +
      "\r\n" +
      "ORDEN DE RECIBO POR CDS NO.: \r\n" +
      this.context.invoice.numeroFactura +
      "\r\n" +
      "\r\n" +
      reimp +
      "\r\n" +
      "Cliente: " +
      this.context.invoice.cliente +
      " \r\n" +
      "Documento identidad: " +
      //$filter("number")(this.context.invoice.cedulaCliente) +
      "\r\n";

    factura +=
      "Concepto: Abono Credito " +
      this.context.invoice.codigoCredito +
      " \r\n \r\n";

    factura +=
      "Valor pagado: $" +
      // $filter("number")(this.context.invoice.total) +
      ",00 \r\n";

    factura +=
      "------ \r\n" +
      "Total: $" +
      //$filter("number")(this.context.invoice.total) +
      ",00 \r\n \r\n";

    if (
      this.context.invoice.mensaje !== "" &&
      this.context.invoice.mensaje !== null
    ) {
      factura +=
        "Mensaje: " +
        this.context.invoice.mensaje +
        " \r\n" +
        sesion.mensajeImpresion +
        " \r\n \r\n" +
        "PROMOCION: " +
        sesion.mensajeGlobal +
        " \r\n \r\n" +
        "CODIGO DE SEGURIDAD: " +
        this.context.invoice.codigoSeguridad +
        " \r\n" +
        "\r\n \r\n \r\n";
    } else {
      factura +=
        sesion.mensajeImpresion +
        " \r\n \r\n" +
        "PROMOCION: " +
        sesion.mensajeGlobal +
        " \r\n \r\n" +
        "CODIGO DE SEGURIDAD: " +
        this.context.invoice.codigoSeguridad +
        " \r\n" +
        "\r\n \r\n \r\n";
    }
    alert(factura);
    /* useDefaultPrinter();
    qz.append(factura);
    qz.print();*/
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
                  {this.context.invoice.fecha}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Agencia:</b>
                  {this.context.invoice.agencia}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Cliene:</b>
                  {this.context.invoice.cliente}
                </div>
              </div>

              <div className="row">
                <div className="label-detail space">
                  <b>Cédula:</b>
                  {this.context.invoice.cedulaCliente}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Crédito:</b>
                  {this.context.invoice.codigoCredito}
                </div>
              </div>
              <div className="row">
                <div className="label-detail space">
                  <b>Total:</b>
                  {this.context.invoice.total}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="form-group">
            <ButtonFmb
              name="Imprimir"
              disabled="true"
              icon="fas fa-print"
              onClick={this.reprint.bind(this)}
            />
          </div>
          <div className="form-group">
            <ButtonFmb
              name="Cerrar"
              disabled="true"
              icon="fas fa-times"
              onClick={this.props.setMasterChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

PrintDetail.contextType = AppContext;

export default PrintDetail;
