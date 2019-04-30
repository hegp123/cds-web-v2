import React, { Component } from "react";
import HeaderFmb from "./HeaderFmb";
import FooterFmb from "./FooterFmb";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../css/Payment.css";
import "../css/Report.css";
import ButtonFmb from "./ButtonFmb";
import es from "date-fns/locale/es";

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  validateForm() {
    return this.state.startDate.length === 0;
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
                onClick={this.searchInvoice}
                disabled={!this.validateForm()}
              />
            </div>
          </div>
        </form>

        <FooterFmb type={typeProcess} />
      </div>
    );
  }
}

export default Print;
