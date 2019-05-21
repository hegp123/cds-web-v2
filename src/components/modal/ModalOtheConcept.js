import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import InputTextFmb from "./../InputTextFmb";
import ButtonFmb from "./../ButtonFmb";
import { SESSION, INVOICE_PRINT } from "../../utils/Constants";
import { withRouter } from "react-router";

class ModalOtherConcept extends Component {
  constructor(props) {
    super(props);
    this.state = { documentType: "", documentNumber: "", valueToPay: "" };
    this.handleChange = this.handleChange.bind(this);
    this.payOtherConcept = this.payOtherConcept.bind(this);
  }

  validateForm() {
    return (
      this.state.documentNumber.length > 0 &&
      this.state.documentType.length > 0 &&
      this.state.valueToPay.length > 0
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  payOtherConcept() {
    sessionStorage.setItem(INVOICE_PRINT, JSON.stringify({}));
    this.props.history.push("/paymentPrint/otherConcept");
  }

  render() {
    return (
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
                  <b>Concepto:</b> {""}
                </div>
              </div>
              <div className="row">
                <div className="label-popup">
                  <b>Poliza:</b>{" "}
                </div>
              </div>
              <div className="row">
                <div className="label-popup">
                  <b>Valor a pagar:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-popup">
                  <b>Cantidad:</b>
                </div>
              </div>
              <div className="row">
                <div className="label-popup form-group">
                  <b>Sede:</b>{" "}
                </div>
              </div>
              <div className="row ">
                <div className="w-100 form-group">
                  <select
                    className="form-control"
                    name="documentType"
                    onChange={this.handleChange}
                  >
                    <option value="">Tipo documento</option>
                    <option value="1">Tipo Documento 1</option>
                    <option value="2">Tipo Documento 2</option>
                    <option value="3">Tipo Documento 3</option>
                  </select>
                </div>
              </div>
              <div className="row ">
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
              <div className="row ">
                <div className="w-100">
                  <InputTextFmb
                    type="number"
                    icon="fa fa-dollar-sign"
                    name="valueToPay"
                    placeholder="Valor a pagar"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <ButtonFmb
              id="buttonPagar"
              name="Pagar"
              icon="fa fa-dollar-sign"
              disabled={!this.validateForm()}
              onClick={this.payOtherConcept}
            />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

ModalOtherConcept = withRouter(ModalOtherConcept);
export default ModalOtherConcept;
