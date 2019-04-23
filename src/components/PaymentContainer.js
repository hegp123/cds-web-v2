import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";

export default class ContainerFmb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeFilter: "0", //cedula por defecto
      numberFilter: ""
    };
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="w-100">
            <span className="float-left">Buscar por:</span>
          </div>
        </div>
        <div className="row">
          <div className="w-100 form-group">
            <select
              className="form-control"
              id="typeFilterForm"
              onChange={this.handleChange("typeFilter")}
            >
              <option value="0" selected>
                Cédula
              </option>
              <option value="1">Crédito</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="w-100 form-group">
            <InputTextFmb
              type="text"
              icon="fa fa-search"
              name="Titulo"
              placeholder="Escriba aquí el número"
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
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = event => {
    alert(this.state.typeFilter + "    -  " + this.state.numberFilter);
    event.preventDefault();
  };
}
