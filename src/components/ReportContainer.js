import React, { Component } from "react";
import DatePicker from "react-datepicker";

import { buscarPagos } from "./../services/ReportService";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Payment.css";
import "../css/Report.css";
import ButtonFmb from "./ButtonFmb";
import es from "date-fns/locale/es";
import { SESSION } from "../utils/Constants";
import { numberFilter } from "../utils/Utils";
import { dateFormat } from "../utils/Utils";

import ModalAlert from "./modal/ModalAlert";
import ModalReport from "./modal/ModalReport";

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      modalReport: "",
      modalAlert: false,
      collectionPoint: "",
      totalPaid: "",
      payments: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchPayments = this.searchPayments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleReport = this.toggleReport.bind(this);
    this.searchPayments = this.searchPayments.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  toggle() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  toggleReport() {
    this.setState(prevState => ({
      modalReport: !prevState.modalReport
    }));
  }

  validateForm() {
    return this.state.startDate.length === 0;
  }

  searchPayments() {
    var valueSession = JSON.parse(sessionStorage.getItem(SESSION));
    var reporte = "";
    let moment = require("moment");
    buscarPagos(
      moment(this.state.startDate).format("YYYYMMDD"),
      valueSession.idRecaudador
    ).then(pagos => {
      reporte =
        "\r\n \r\n \r\n" +
        "Reporte \r\n" +
        "Fecha: " +
        moment(this.state.startDate).format("dddd, MMMM D") +
        " \r\n";
      if (pagos.length > 0) {
        reporte +=
          "Punto de Recaudo: " +
          pagos[0].agencia +
          " \r\n" +
          "\r\n" +
          "ORDENES DE RECIBO CDS \r\n \r\n";
        let totalPagado = 0;
        this.setState({ collectionPoint: pagos[0].agencia });
        for (var i = 0; i < pagos.length; i++) {
          if (pagos[i].estado === "0" || pagos[i].estado === "1") {
            pagos[i].mostrar = true;
            totalPagado += Number(pagos[i].valor);
            reporte +=
              pagos[i].factura +
              ": $" +
              numberFilter(pagos[i].valor) +
              ",00 \r\n";
          } else {
            pagos[i].mostrar = false;
            reporte += pagos[i].factura + ": ANULADA \r\n";
          }
        }
        reporte += "------ \r\n";
        reporte +=
          "TOTAL: $" +
          numberFilter(totalPagado) +
          ",00 \r\n \r\n \r\n \r\n \r\n \r\n";
        this.setState({ payments: pagos });
        this.setState({ totalPaid: totalPagado });
        this.toggleReport();
      } else {
        this.toggle();
      }
    });
  }

  render() {
    return (
      <div>
        <br />
        <form className="container">
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">Fecha:</span>
            </div>
            <div className="w-100">
              <span className="float-left font-label-fmb">
                <DatePicker
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  dateFormat="dd-MM-yyyy"
                  locale={es}
                />
              </span>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="w-100 form-group">
              <ButtonFmb
                name="Buscar"
                icon="fa fa-search"
                onClick={this.searchPayments}
                disabled={this.validateForm()}
              />
            </div>
          </div>
        </form>

        <ModalAlert
          toggle={this.toggle}
          isOpen={this.state.modalAlert}
          content={
            "No hay pagos registrados para la fecha " + this.state.startDate
          }
        />
        <ModalReport
          toggle={this.toggleReport}
          isOpen={this.state.modalReport}
          collectionPoint={this.state.collectionPoint}
          totalPaid={this.state.totalPaid}
          payments={this.state.payments}
          datePayment={dateFormat(this.state.startDate)}
        />
      </div>
    );
  }
}

export default ReportContainer;
