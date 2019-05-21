import React, { Component } from "react";
import { withRouter } from "react-router";

import payment from "../img/registrarPago.png";
import print from "../img/reimpFactura.png";
import report from "../img/reportePagos.png";
import otherConcept from "../img/registrarPago.png";

import paymentAct from "../img/registrarPagoAct.png";
import printAct from "../img/reimpFacturaAct.png";
import reportAct from "../img/reportePagosAct.png";
import otherConceptAct from "../img/registrarPagoAct.png";

import "../css/FooterFmb.css";

class FooterFmb extends Component {
  redirectPage(ruta) {
    this.props.history.push("/" + ruta);
  }

  render() {
    const paymentImg = this.props.type === "payment" ? paymentAct : payment;
    const printImg = this.props.type === "print" ? printAct : print;
    const reportImg = this.props.type === "report" ? reportAct : report;
    const otherConceptImg =
      this.props.type === "otherConcept" ? otherConceptAct : otherConcept;

    const paymentText =
      this.props.type === "payment" ? "textEnabled" : "textDisabled";
    const printText =
      this.props.type === "print" ? "textEnabled" : "textDisabled";
    const reportText =
      this.props.type === "report" ? "textEnabled" : "textDisabled";
    const otherConceptText =
      this.props.type === "otherConcept" ? "textEnabled" : "textDisabled";

    return (
      <div>
        <footer>
          <div className="container, footerMenu">
            <div className="row">
              <div className="col-sm-3">
                <a href="#" onClick={this.redirectPage.bind(this, "payment")}>
                  <div className="form-group">
                    <img src={paymentImg} />
                    <div className={paymentText}>Registrar pago</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-3">
                <a href="#" onClick={this.redirectPage.bind(this, "report")}>
                  <div className="form-group">
                    <img src={reportImg} />
                    <div className={reportText}>Reporte de pagos</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <a href="#" onClick={this.redirectPage.bind(this, "print")}>
                    <img src={printImg} />
                    <div className={printText}>Reimprimir orden</div>
                  </a>
                </div>
              </div>
              <div className="col-sm-3">
                <a
                  href="#"
                  onClick={this.redirectPage.bind(this, "otherConcept")}
                >
                  <div className="form-group">
                    <img src={otherConceptImg} />
                    <div className={otherConceptText}>Pago otros</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

FooterFmb = withRouter(FooterFmb);
export default FooterFmb;
