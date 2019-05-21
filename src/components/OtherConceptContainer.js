import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";

class OtherConceptContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: "",
      poliza: "",
      quantity: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    return (
      this.state.concept.length > 0 &&
      ((this.state.concept === "2" && this.state.poliza.length > 0) ||
        this.state.concept !== "2") &&
      this.state.quantity.length > 0
    );
  }

  render() {
    var partial;
    if (this.state.concept === "2") {
      partial = (
        <div>
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">Poliza:</span>
            </div>
          </div>
          <div className="row ">
            <div className="w-100 form-group">
              <select
                className="form-control"
                name="poliza"
                onChange={this.handleChange}
              >
                <option value="" />
                <option value="1">Poliza 1</option>
                <option value="2">Poliza 2</option>
                <option value="3">Poliza 3</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <form className="container">
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">Concepto:</span>
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <select
                className="form-control"
                name="concept"
                onChange={this.handleChange}
              >
                <option value="" />
                <option value="1">Concepto 1</option>
                <option value="2">Concepto 2</option>
                <option value="3">Concepto 3</option>
              </select>
            </div>
          </div>
          {partial}
          <div className="row">
            <div className="w-100 form-group">
              <InputTextFmb
                type="number"
                icon="fas fa-plus"
                name="quantity"
                placeholder="Cantidad"
                value={this.state.numberFilter}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <ButtonFmb
                name="Buscar"
                disabled={!this.validateForm()}
                icon="fa fa-search"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default OtherConceptContainer;
