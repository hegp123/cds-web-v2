import React, { Component } from "react";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import { validateAPI } from "../services/LoginService";
import { buscarPorCC, buscarPorCredito } from "../services/PaymentService";
import ModalAlert from "./modal/ModalAlert";

import {
  placeHolderCedula,
  placeHolderCredito,
  cedulaValue,
  creditoValue
} from "../utils/Constants";
import { SESSION } from "../utils/Constants";
import ModalPayment from "./modal/ModalPayment";

export default class PaymentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeFilter: "0", //cedula por defecto
      numberFilter: "82990",
      placeHolderNumberFilter: placeHolderCedula,
      modalAlert: false,
      modalAlertContent: "",
      callbackOnClosed: () => {},
      modal: false,
      creditos: []
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
                defaultValue={cedulaValue}
              >
                <option value={cedulaValue}>Cédula</option>
                <option value={creditoValue}>Crédito</option>
              </select>
            </div>
          </div>
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

  validateForm() {
    return (
      this.state.typeFilter.length > 0 && this.state.numberFilter.length > 0
    );
  }

  handleChange = prop => event => {
    let value = event.target.value;

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
    event.preventDefault();
    var cadenaBusqueda = this.state.numberFilter;

    var sesion = JSON.parse(sessionStorage.getItem(SESSION));
    let mensaje = null;
    validateAPI()
      .then(() => {
        if (this.state.typeFilter === "0") {
          mensaje =
            "No hay créditos asociados al No. de identificación ingresado";
          return buscarPorCC(cadenaBusqueda, sesion.idPunto);
        } else {
          mensaje = "No hay créditos asociados al No. de crédito ingresado";

          return buscarPorCredito(cadenaBusqueda, sesion.idPunto);
        }
      })
      .then(data => {
        let creditos = data;

        if (creditos.length > 0 && creditos[0].id !== null) {
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
