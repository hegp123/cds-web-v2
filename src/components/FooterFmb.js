import React, { Component } from "react";

import payment from "../img/registrarPago.png";
import print from "../img/reimpFactura.png";
import report from "../img/reportePagos.png";
import paymentAct from "../img/registrarPagoAct.png";
import printAct from "../img/reimpFacturaAct.png";
import reportAct from "../img/reportePagosAct.png";

import "../css/FooterFmb.css";

class FooterFmb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const paymentImg = this.props.type == "payment" ? paymentAct : payment;
    const printImg = this.props.type == "print" ? printAct : print;
    const reportImg = this.props.type == "report" ? reportAct : report;

    const paymentText =
      this.props.type == "payment" ? "textEnabled" : "textDisabled";
    const printText =
      this.props.type == "print" ? "textEnabled" : "textDisabled";
    const reportText =
      this.props.type == "report" ? "textEnabled" : "textDisabled";

    return (
      <div>
        <footer>
          <div className="container, footerMenu">
            <div className="row">
              <div className="col-sm-4">
                <a href="#">
                  <div className="form-group">
                    <img src={paymentImg} />
                    <div className={paymentText}>Registrar pago</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="#">
                  <div className="form-group">
                    <img src={reportImg} />
                    <div className={reportText}>Reporte de pagos</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-4">
                <a href="#">
                  <div className="form-group">
                    <img src={printImg} />
                    <div className={printText}>Reimprimir orden</div>
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

export default FooterFmb;
