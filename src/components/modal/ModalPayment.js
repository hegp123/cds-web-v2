import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Alert.css";
import NumberFormat from "react-number-format";
import {
  buscarPorSeleccion,
  infoPagosCredito,
  pagarCredito
} from "../../services/PaymentService";
import ButtonFmb from "../ButtonFmb";
import InputTextFmb from "../InputTextFmb";
import ModalAlert from "./ModalAlert";
import ModalConfirm from "./ModalConfirm";
import { SESSION, INVOICE_PRINT } from "../../utils/Constants";
import { numberFilter } from "../../utils/Utils";
import { withRouter } from "react-router";

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
          size="lg"
          className="modal-print"
          scrollable={true}
          isOpen={this.props.isOpen}
        >
          <ModalHeader toggle={this.props.toggle} className="body-header" />
          <ModalBody className="pop-up-padding">
            <div className="navbar navbar-default navbar-fixed-top subHeader">
              <div className="navbar-header">
                <div className="container">Registrar Pago</div>
              </div>
            </div>
            {this.showCreditos()}
            <br />
          </ModalBody>
        </Modal>
        {this.showPago()}
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
                  <b>Producto:</b> {credito.idproducto}
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
        size="lg"
        isOpen={this.state.nestedModal}
        className="modal-print"
        scrollable={true}
      >
        <ModalHeader toggle={this.toggleNested} className="body-header" />
        <ModalBody className="pop-up-padding">
          <div className="navbar navbar-default navbar-fixed-top subHeader">
            <div className="navbar-header">
              <div className="container">Registrar Pago</div>
            </div>
          </div>
          {this.showFormPago()}
          <br />
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
                <b>Producto:</b> {credito.idproducto}
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
            readOnly={this.state.parametrizado}
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

    this.setState({
      credito,
      valueToPay: credito.cuotaCredito
    });
    this.toggleNested();
    /*
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
          this.showAlert(data.mensaje + data.valor);
        }
      })
      .catch(error => {
        this.showAlert(error);
      });*/
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
    } else if (valor > credito.cuotaCredito) {
      this.showConfirm(
        "Pago supera el valor de la cuota.",
        () => {},
        this.modalConfirmOk.bind(this, credito, valor)
      );
    } else if (valor < credito.cuotaCredito) {
      this.showConfirm(
        "El valor a pagar es menor que la cuota. ¿Seguro que desea realizar el pago por $" +
          numberFilter(valor) +
          "?",
        () => {},
        this.modalConfirmOk.bind(this, credito, valor)
      );
    } else {
      this.showConfirm(
        " ¿Seguro que desea realizar el pago por $" + numberFilter(valor) + "?",
        () => {},
        this.modalConfirmOk.bind(this, credito, valor)
      );
    }
  };

  modalConfirmOk = (credito, valor) => {
    this.toggleConfirm();
    let sesion = JSON.parse(sessionStorage.getItem(SESSION));
    let pago = {
      Nrocredito: credito.codigoCredito,
      ValorEfectivo: valor,
      FechaPago: new Date(),
      CodigoBP: sesion.idPunto,
      TipoPago: "1"
    };

    pagarCredito(pago).then(ordenRecibo => {
      if (ordenRecibo.idFactura !== null && ordenRecibo.numeroFactura !== "0") {
        this.toggleConfirm();
        this.toggleNested();
        sessionStorage.setItem(INVOICE_PRINT, JSON.stringify(ordenRecibo));
        this.props.history.push("/paymentPrint/payment");
      } else {
        if (ordenRecibo.valorMensaje !== null) {
          this.showAlert(
            "Falló el pago al crédito No. " +
              credito.codigoCredito +
              ". " +
              ordenRecibo.mensaje +
              "$" +
              ordenRecibo.valorMensaje
          );
        } else {
          this.showAlert(
            "Falló el pago al crédito No. " +
              credito.codigoCredito +
              ". " +
              ordenRecibo.mensaje
          );
        }
      }
    });
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
ModalPayment = withRouter(ModalPayment);
export default ModalPayment;
