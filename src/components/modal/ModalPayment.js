import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../css/Alert.css";
import NumberFormat from "react-number-format";
import {
  buscarPorSeleccion,
  infoPagosCredito
} from "../../services/PaymentService";

class ModalPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      credito: {}
    };

    // this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
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

  render() {
    const { items } = this.props.creditos;
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
        {/* <ModalFooter>
          <Button color="primary" onClick={this.toggleNested}>
            $ Pagar
          </Button>{" "}
        </ModalFooter> */}
      </Modal>
    );
  };

  showFormPago = () => {
    let moment = require("moment");
    require("moment/locale/es");
    const credito = this.state.credito;
    return (
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
      </div>
    );
  };

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
          credito
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
}

export default ModalPayment;
