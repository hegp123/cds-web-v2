import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import DatePicker from "react-datepicker";

import { buscarPagos } from "./../services/ReportService";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Payment.css";
import "../css/Report.css";
import ButtonFmb from "./ButtonFmb";
import es from "date-fns/locale/es";
import { SESSION } from "../utils/Constants";
import { numberFilter } from "../utils/Utils";
import ModalAlert from "./modal/ModalAlert";

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      content: "",
      modalAlert: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchPayments = this.searchPayments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changeModalContent = this.changeModalContent.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  changeModalContent(valor) {
    this.setState({ conten: valor });
  }

  toggle() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
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
        moment(new Date(this.state.startDate)).format("LLLL") +
        " \r\n";
      if (pagos.length > 0) {
        reporte +=
          "Punto de Recaudo: " +
          pagos[0].agencia +
          " \r\n" +
          "\r\n" +
          "ORDENES DE RECIBO CDS \r\n \r\n";
        let totalPagado = 0;

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
      } else {
        this.toggle();
      }
    });
  }

  render() {
    const typeProcess = "report";
    return (
      <div>
        <HeaderFmb type={typeProcess} />
        <br />
        <form className="container">
          <div className="row">
            <div className="w-100  form-group">
              <span className="float-left font-label-fmb">Fecha:</span>
            </div>
          </div>
          <div className="row">
            <div className="w-100  form-group">
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
                disabled={!this.validateForm()}
              />
            </div>
          </div>
        </form>
        <FooterFmb type={typeProcess} />

        <ModalAlert
          toggle={this.toggle}
          isOpen={this.state.modalAlert}
          content={
            "No hay pagos registrados para la fecha " + this.state.startDate
          }
        />
      </div>
    );
  }
}

export default Print;
