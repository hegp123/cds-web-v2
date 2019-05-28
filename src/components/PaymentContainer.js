import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import { validateAPI } from "../services/LoginService";
import { buscarCredito } from "../services/PaymentService";
import ModalAlert from "./modal/ModalAlert";

import {
  placeHolderCedula,
  placeHolderCredito,
  tipoIdentificacionValue,
  creditoValue,
  nitValue
} from "../utils/Constants";
import { SESSION } from "../utils/Constants";
import ModalPayment from "./modal/ModalPayment";
import { idValue } from "./../utils/Constants";

export default class PaymentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeFilter: "0", //tipo identificacion por defecto
      numberFilter: "82990",
      placeHolderNumberFilter: placeHolderCedula,
      modalAlert: false,
      modalAlertContent: "",
      callbackOnClosed: () => {},
      modal: false,
      creditos: [],
      documentType: idValue
    };

    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleAlert() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  render() {
    return (
      <div>
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
                defaultValue={tipoIdentificacionValue}
              >
                <option value={tipoIdentificacionValue}>
                  Tipo identificación
                </option>
                <option value={creditoValue}>Crédito</option>
              </select>
            </div>
          </div>
          {this.returnDocumentType()}
          <div className="row">
            <div className="w-100 form-group">
              <InputTextFmb
                type="number"
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
                disabled={!this.validateForm()}
                icon="fa fa-search"
                type="submit"
              />
            </div>
          </div>
        </form>
        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content={this.state.modalAlertContent}
          callbackOnClosed={this.state.callbackOnClosed}
        />
        <ModalPayment
          isOpen={this.state.modal}
          toggle={this.toggle}
          creditos={this.state.creditos}
        />
      </div>
    );
  }

  returnDocumentType() {
    if (this.state.typeFilter === tipoIdentificacionValue) {
      return (
        <div>
          {" "}
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">Tipo documento:</span>
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <select
                className="form-control"
                id="documentType"
                name="documentType"
                onChange={this.handleChange("documentType")}
                defaultValue={idValue}
              >
                <option value={idValue}>Cédula</option>
                <option value={nitValue}>NIT</option>
              </select>
            </div>
          </div>{" "}
        </div>
      );
    }
  }

  validateForm() {
    return (
      this.state.typeFilter.length > 0 && this.state.numberFilter.length > 0
    );
  }

  handleChange = prop => event => {
    let value = event.target.value;

    this.setState({ [prop]: value });
    if (prop === "typeFilter") {
      if (value === tipoIdentificacionValue) {
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
    event.preventDefault();
    var cadenaBusqueda = this.state.numberFilter;

    var sesion = JSON.parse(sessionStorage.getItem(SESSION));
    let mensaje = null;
    let creditSearch = null;
    validateAPI()
      .then(() => {
        if (this.state.typeFilter === "0") {
          mensaje =
            "No hay créditos asociados al No. de identificación ingresado";

          //TODO setear usaer y pass de SAP
          creditSearch = {
            Usuario: "usuario",
            Contraseña: "36523",
            ParametroBusqueda: "1",
            TipoDocumento: this.state.documentType,
            NroDocumento: this.state.numberFilter,
            CodigoBP: sesion.idPunto
          };
          return buscarCredito(creditSearch);
        } else {
          mensaje = "No hay créditos asociados al No. de crédito ingresado";
          creditSearch = {
            Usuario: "usuario",
            Contraseña: "36523",
            ParametroBusqueda: "2",
            NroCredito: this.state.numberFilter,
            CodigoBP: sesion.idPunto
          };
          return buscarCredito(creditSearch);
        }
      })
      .then(data => {
        let creditos = data;

        if (creditos.length > 0) {
          this.setState({
            creditos: creditos
          });
          this.toggle();
        } else {
          this.showAlert(mensaje);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  showAlert = (message, callback = () => {}) => {
    this.setState({
      modalAlertContent: message,
      callbackOnClosed: callback
    });

    this.toggleAlert();
  };
}
