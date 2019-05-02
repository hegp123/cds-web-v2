import React, { Component } from "react";

import ModalAlert from "./modal/ModalAlert";
import ModalPrint from "./modal/ModalPrint";

import { AppContext } from "../context/AppContext";
import InputTextFmb from "./InputTextFmb";
import ButtonFmb from "./ButtonFmb";
import { buscarFactura } from "./../services/PrintService";
import { withRouter } from "react-router";
import { SESSION } from "../utils/Constants";

class PrintContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orden: "",
      order: "",
      customer: "",
      dateOrder: "",
      total: "",
      modal: false,
      modalAlert: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.searchInvoice = this.searchInvoice.bind(this);
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

  searchInvoice() {
    var valueSession = JSON.parse(sessionStorage.getItem(SESSION));
    buscarFactura(
      this.state.orden,
      valueSession.idPunto,
      valueSession.idRecaudador
    ).then(response => {
      if (response.length > 0 && response[0].numeroFactura !== null) {
        this.setState({ order: response[0].numeroFactura });
        this.setState({ customer: response[0].cliente });
        this.setState({ dateOrder: response[0].fecha });
        this.setState({ total: response[0].total });
        this.context.setInvoice(response[0]);
        this.toggle();
      } else {
        this.toggleAlert();
      }
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    return this.state.orden.length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="w-100">
              <span className="float-left font-label-fmb">
                Orden de Recibo No. {this.state.modal}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="w-100 form-group">
              <InputTextFmb
                type="number"
                icon="fa fa-search"
                name="orden"
                placeholder="Escriba aquí el No. de factura"
                value={this.state.orden}
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
                onClick={this.searchInvoice}
              />
            </div>
          </div>
        </form>

        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content="No existe el número de Orden de Recibo ingresado, o el pago se realizó en otro punto de recaudo"
        />

        <ModalPrint
          isOpen={this.state.modal}
          toggle={this.toggle}
          order={this.state.order}
          customer={this.state.customer}
          dateOrder={this.state.dateOrder}
          total={this.state.total}
          setMasterChanged={this.props.setMasterChanged}
        />
      </div>
    );
  }
}

PrintContainer.contextType = AppContext;

PrintContainer = withRouter(PrintContainer);
export default PrintContainer;
