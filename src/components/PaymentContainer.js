import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import {
  placeHolderCedula,
  placeHolderCredito,
  cedulaValue,
  creditoValue
} from "../js/Constants";

export default class ContainerFmb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeFilter: "0", //cedula por defecto
      numberFilter: "",
      placeHolderNumberFilter: placeHolderCedula
    };
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="w-100">
            <span className="float-left font-label-fmb">Buscar por:</span>
          </div>
        </div>
        <div className="row">
          <div className="w-100 form-group">
            <select
              className="form-control"
              id="typeFilterForm"
              name="typeFilterForm"
              onChange={this.handleChange("typeFilter")}
            >
              <option value={cedulaValue} selected>
                Cédula
              </option>
              <option value={creditoValue}>Crédito</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="w-100 form-group">
            <InputTextFmb
              type="text"
              icon="fa fa-search"
              name="Titulo"
              placeholder={this.state.placeHolderNumberFilter}
              value={this.state.numberFilter}
              onChange={this.handleChange("numberFilter")}
            />
          </div>
        </div>
        <div className="row">
          <div className="w-100 form-group">
            <ButtonFmb
              name="Buscar"
              disabled={this.validateForm()}
              icon="fa fa-search"
            />
          </div>
        </div>
      </form>
    );
  }

  validateForm() {
    return (
      this.state.typeFilter.length > 0 && this.state.numberFilter.length > 0
    );
  }

  handleChange = prop => event => {
    let value = event.target.value;

    if (!/^([0-9])*$/.test(value)) {
      return false;
    }
    this.setState({ [prop]: value });
    if (prop === "typeFilter") {
      if (value === cedulaValue) {
        this.setState({
          placeHolderNumberFilter: placeHolderCedula
        });
      } else {
        this.setState({
          placeHolderNumberFilter: placeHolderCredito
        });
      }
    }
  };

  handleSubmit = event => {
    alert(this.state.typeFilter + "    -  " + this.state.numberFilter);
    event.preventDefault();
  };
}
