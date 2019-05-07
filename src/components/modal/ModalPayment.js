import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../css/Alert.css";
import NumberFormat from "react-number-format";
import {
  buscarPorSeleccion,
  infoPagosCredito
} from "../../services/PaymentService";
import ButtonFmb from "../ButtonFmb";
import InputTextFmb from "../InputTextFmb";
import ModalAlert from "./ModalAlert";
import ModalConfirm from "./ModalConfirm";
import { SESSION } from "../../utils/Constants";

class ModalPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      credito: {},
      valueToPay: "",
      modalAlert: false,
      modalAlertContent: "",
      callbackOnClosed: () => {},
      modalConfirm: false,
      modalConfirmContent: "",
      callbackConfirmOnClosed: () => {},
      callbackConfirmOk: () => {}
    };

    // this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  toggleAlert() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  toggleConfirm() {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          size="lg"
          className="modal-print"
          scrollable={true}
        >
          <ModalHeader toggle={this.props.toggle} className="body-header" />
          <ModalBody className="pop-up-padding">
            <div className="navbar navbar-default navbar-fixed-top subHeader">
              <div className="navbar-header">
                <div className="container">Registrar Pago</div>
              </div>
            </div>
            {this.showCreditos()}
            {this.showPago()}
            <br />
          </ModalBody>
        </Modal>
        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content={this.state.modalAlertContent}
          callbackOnClosed={this.state.callbackOnClosed}
          title="Realizar pago de cuota"
        />
      </div>
    );
  }

  showCreditos = () => {
    let moment = require("moment");
    require("moment/locale/es");
    return this.props.creditos.map(credito => {
      return (
        <div className="list-group, list-print" key={credito.codigoCredito}>
          <a
            href="#"
            className="list-group-item list-group-item-action"
            onClick={this.prepararPago.bind(this, credito)}
          >
            <div className="container">
              <div className="row">
                <div className="label-name">
                  <b>Nombre del Cliente:</b> {credito.nombreCliente}
                </div>
              </div>
              <div className="row">
                <div className="label-popup">
                  {" "}
                  <b>Cédula:</b>{" "}
                  <NumberFormat
                    value={credito.cedulaCliente}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    displayType={"text"}
                  />
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="label-popup">
                  <b>Producto:</b> {credito.tipoCredito}
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="label-popup">
                  <b>Crédito:</b> {credito.codigoCredito}
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="label-popup">
                  <b>Valor cuota:</b>{" "}
                  <NumberFormat
                    value={credito.cuotaCredito}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    displayType={"text"}
                    prefix={"$"}
                  />
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="label-popup">
                  <b>Fecha de vencimiento:</b>{" "}
                  {moment(credito.vencimiento).format(
                    "dddd, D [de] MMMM [de] YYYY"
                  )}
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    });
  };

  showPago = () => {
    return (
      <Modal
        isOpen={this.state.nestedModal}
        toggle={this.toggleNested}
        onClosed={this.state.closeAll ? this.props.toggle : undefined}
        className="modal-print"
      >
        <ModalHeader className="body-header" />
        <ModalBody className="pop-up-padding">
          <div className="navbar navbar-default navbar-fixed-top subHeader">
            <div className="navbar-header">
              <div className="container">Registrar Pago</div>
            </div>
          </div>
          {this.showFormPago()}
        </ModalBody>
      </Modal>
    );
  };

  showFormPago = () => {
    let moment = require("moment");
    require("moment/locale/es");
    const credito = this.state.credito;
    return (
      <>
        <div className="list-group, list-print">
          <div className="container">
            <div className="row">
              <div className="label-name">
                <b>Nombre del Cliente:</b> {credito.nombreCliente}
              </div>
            </div>
            <div className="row">
              <div className="label-popup">
                {" "}
                <b>Cédula:</b>{" "}
                <NumberFormat
                  value={credito.cedulaCliente}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  displayType={"text"}
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="label-popup">
                <b>Producto:</b> {credito.tipoCredito}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="label-popup">
                <b>Crédito:</b> {credito.codigoCredito}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="label-popup">
                <b>Valor cuota:</b>{" "}
                <NumberFormat
                  value={credito.cuotaCredito}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  displayType={"text"}
                  prefix={"$"}
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="label-popup">
                <b>Fecha de vencimiento:</b>{" "}
                {moment(credito.vencimiento).format(
                  "dddd, D [de] MMMM [de] YYYY"
                )}
              </div>
            </div>
          </div>
          <br />
          <InputTextFmb
            type="number"
            icon="fa fa-dollar-sign"
            name="valueToPay"
            placeholder="Valor a pagar"
            value={this.state.valueToPay}
            onChange={this.handleChange}
            ref="valueToPay"
          />

          <ButtonFmb
            id="buttonPagar"
            name="Pagar"
            icon="fa fa-dollar-sign"
            // disabled={this.refs.valueToPay && !this.validateForm()}
            onClick={this.realizarPago.bind(
              this,
              credito,
              this.state.valueToPay
            )}
          />
        </div>
        <ModalConfirm
          ok={this.state.callbackConfirmOk}
          cancel={this.toggleConfirm}
          isOpen={this.state.modalConfirm}
          content={this.state.modalConfirmContent}
          callbackOnClosed={this.state.callbackConfirmOnClosed}
          title="Realizar pago de cuota"
        />
      </>
    );
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    return this.state.valueToPay.length > 0;
  }

  prepararPago = credito => {
    //

    let parametrizado = false; //TODO
    if (credito.valorBloqueado) {
      parametrizado = true;
    } else {
      parametrizado = false;
    }

    buscarPorSeleccion(
      credito.codigoCredito,
      credito.cuotaCredito,
      credito.id,
      credito.tacCDS,
      credito.porVencer
    )
      .then(data => {
        let credito = data[0];
        this.setState({
          credito,
          valueToPay: credito.cuotaCredito
        });
        this.toggleNested();
        return infoPagosCredito(credito.codigoCredito);
      })
      .then(data => {
        if (data.mensaje !== null && data.valor !== null) {
          alert(data.mensaje + "   -   " + data.valor);
          //TODO
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  realizarPago = (credito, valorPagar) => {
    let moment = require("moment");
    require("moment/locale/es");

    let valor = valorPagar === "" ? "0" : valorPagar;
    let inicioCuota = moment(credito.fechaInicioCuota);
    let fechaProceso = moment(credito.fechaProceso);

    if (valor === "0") {
      this.showAlert(`Debe registrar un valor igual o mayor a ${valor}`);
      return;
    } else if (fechaProceso < inicioCuota || credito.porVencer) {
      //credito.fechaInicioCuota y credito.fechaProceso estan llegando undefined, porque el servicio web no lo esta retornando, tal vez un requerimiento
      // pero esto no afecta (totea) la app porque la comparacion  fechaProceso < inicioCuota  esta correcta
      // osea que en esa condicion solo se esta ejecutando realmente credito.porVencer=true
      this.showConfirm(
        "Está realizando abono a capital.",
        () => {},
        this.modalConfirmOk.bind(this, credito, valor)
      );
    }

    // this.showAlert(`Todo bien :)`);
  };

  modalConfirmOk = (credito, valor) => {
    let sesion = JSON.parse(sessionStorage.getItem(SESSION));
    let pago = {
      cuenta: credito.codigoCredito,
      cuota: credito.cuotaCredito,
      operacion: credito.operacion,
      sucursal: credito.sucursalCliente,
      producto: credito.idproducto,
      tac: credito.tacCDS,
      valor: valor,
      idRecaudador: sesion.idRecaudador,
      pure: sesion.idPunto,
      porVencer: credito.porVencer
    };
  };

  showAlert = (message, callback = () => {}) => {
    this.setState({
      modalAlertContent: message,
      callbackOnClosed: callback
    });

    this.toggleAlert();
  };

  showConfirm = (message, callback = () => {}, callbackOk = () => {}) => {
    this.setState({
      modalConfirmContent: message,
      callbackConfirmOnClosed: callback,
      callbackConfirmOk: callbackOk
    });

    this.toggleConfirm();
  };
}

export default ModalPayment;
