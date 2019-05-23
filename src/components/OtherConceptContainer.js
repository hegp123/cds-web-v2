import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import ModalOtherConcept from "./modal/ModalOtheConcept";
import { withRouter } from "react-router";
import { getInfoConcept } from "./../services/OtherConceptService";
import { SESSION } from "./../utils/Constants";

class OtherConceptContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: "",
      conceptName: "",
      poliza: "",
      polizaName: "",
      quantity: "",
      documentType: "",
      documentTypeName: "",
      documentNumber: "",
      valueToPay: "",
      modal: false,
      costumer: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.consultOtherConcept = this.consultOtherConcept.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  consultOtherConcept() {
    var userData = JSON.parse(sessionStorage.getItem(SESSION));
    var otherConcept = {
      TipoDocumento: this.state.documentType,
      NroDocumento: this.state.documentNumber,
      IdConcepto: this.state.concept,
      Cantidad: this.state.quantity,
      Oficina: userData.idPunto,
      Sociedad: "FM01"
    };
    getInfoConcept(otherConcept).then(otherConceptData => {
      this.setState({
        valueToPay: otherConceptData.Valor,
        costumer: otherConceptData.NombreCompleto
      });
      this.toggle();
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    var index = e.nativeEvent.target.selectedIndex;
    if (name === "concept") {
      this.setState({ conceptName: e.nativeEvent.target[index].text });
    } else if (name === "poliza") {
      this.setState({ polizaName: e.nativeEvent.target[index].text });
    }
  }

  validateForm() {
    return (
      this.state.concept.length > 0 &&
      ((this.state.concept === "2" && this.state.poliza.length > 0) ||
        this.state.concept !== "2") &&
      this.state.quantity.length > 0 &&
      this.state.documentNumber.length > 0 &&
      this.state.documentType.length > 0
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
            <div className="w-100">
              <span className="float-left font-label-fmb">Tipo documento:</span>
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <select
                className="form-control"
                name="documentType"
                onChange={this.handleChange}
              >
                <option value="" />
                <option value="1">Tipo documento 1</option>
                <option value="2">Tipo documento 2</option>
                <option value="3">Tipo documento 3</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="w-100">
              <InputTextFmb
                type="number"
                icon="far fa-id-card"
                name="documentNumber"
                placeholder="Número de documento"
                onChange={this.handleChange}
              />
            </div>
          </div>
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
                type="button"
                onClick={this.consultOtherConcept}
              />
            </div>
          </div>
        </form>

        <ModalOtherConcept
          isOpen={this.state.modal}
          toggle={this.toggle}
          otherConceptSelected={this.state}
        />
      </div>
    );
  }
}
OtherConceptContainer = withRouter(OtherConceptContainer);
export default OtherConceptContainer;
