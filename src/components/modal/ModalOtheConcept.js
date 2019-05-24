import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import InputTextFmb from "./../InputTextFmb";
import ButtonFmb from "./../ButtonFmb";
import { INVOICE_PRINT } from "../../utils/Constants";
import { withRouter } from "react-router";
import { numberFilter, dateFormatParameter, isEmpty } from "../../utils/Utils";
import { SESSION } from "./../../utils/Constants";
import { saveOtherConcept } from "./../../services/OtherConceptService";
import ModalAlert from "./ModalAlert";
import ModalConfirm from "./ModalConfirm";

class ModalOtherConcept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToPay: "",
      modalAlert: false,
      modalAlertContent: "",
      callbackOnClosed: () => {},
      modalConfirm: false,
      modalConfirmContent: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.payOtherConcept = this.payOtherConcept.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggleConfirm() {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  showAlert = (message, callback = () => {}) => {
    this.setState({
      modalAlertContent: message,
      callbackOnClosed: callback
    });

    this.toggleAlert();
  };

  toggleAlert() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  showConfirm = message => {
    this.setState({
      modalConfirmContent: message
    });

    this.toggleConfirm();
  };

  payOtherConcept() {
    var userData = JSON.parse(sessionStorage.getItem(SESSION));
    console.log(userData);
    var otherConcept = {
      TipoDocumento: this.props.otherConceptSelected.documentType,
      NroDocumento: this.props.otherConceptSelected.documentNumber,
      Valor: this.props.otherConceptSelected.valueToPay,
      IdConcepto: isEmpty(this.props.otherConceptSelected.poliza)
        ? this.props.otherConceptSelected.concept
        : this.props.otherConceptSelected.poliza,
      Cantidad: this.props.quantity,
      Oficina: userData.idPunto
    };

    saveOtherConcept(otherConcept)
      .then(otherConceptData => {
        var invoice = {
          fecha: dateFormatParameter(new Date(), "DD/MM/YYYY"),
          numeroFactura: otherConceptData.IndicaPagoDto.NumeroFactura,
          cliente: this.props.otherConceptSelected.costumer,
          total: otherConcept.Valor,
          cedulaCliente: this.props.otherConceptSelected.documentNumber
        };
        sessionStorage.setItem(INVOICE_PRINT, JSON.stringify(invoice));
        this.props.history.push("/paymentPrint/otherConcept");
      })
      .catch(error => {
        this.showAlert(error);
      });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} size="lg" className="modal-print">
          <ModalHeader toggle={this.props.toggle} className="body-header" />

          <ModalBody className="pop-up-padding">
            <div className="navbar navbar-default navbar-fixed-top subHeader">
              <div className="navbar-header">
                <div className="container">Pago otros conceptos</div>
              </div>
            </div>

            <div className="list-group, list-print">
              <div className="container">
                <div className="row">
                  <div className="label-popup">
                    <b>Concepto:</b>{" "}
                    {this.props.otherConceptSelected.conceptName}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Poliza:</b> {this.props.otherConceptSelected.polizaName}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Cantidad:</b> {this.props.otherConceptSelected.quantity}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Valor a pagar:</b>
                    {" $"}
                    {numberFilter(this.props.otherConceptSelected.valueToPay)}
                  </div>
                </div>
              </div>
              <br />

              <ButtonFmb
                id="buttonPagar"
                name="Pagar"
                icon="fa fa-dollar-sign"
                onClick={this.payOtherConcept}
              />
            </div>
          </ModalBody>
        </Modal>

        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content={this.state.modalAlertContent}
          callbackOnClosed={this.state.callbackOnClosed}
          title="Pago otro concepto"
        />

        <ModalConfirm
          ok={this.payOtherConcept}
          cancel={this.toggleConfirm}
          isOpen={this.state.modalConfirm}
          content={this.state.modalConfirmContent}
          callbackOnClosed={this.state.callbackConfirmOnClosed}
          title="Pago otro concepto"
        />
      </div>
    );
  }
}

ModalOtherConcept = withRouter(ModalOtherConcept);
export default ModalOtherConcept;
