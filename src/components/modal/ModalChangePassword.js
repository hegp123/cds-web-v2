import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Input, FormFeedback } from "reactstrap";
import "../../css/Alert.css";
import InputTextFmb from "./../InputTextFmb";
import ButtonFmb from "./../ButtonFmb";
import { cambiarClave } from "./../../services/PasswordService";
import { SESSION } from "../../utils/Constants";
import ModalAlert from "./ModalAlert";

class ModalChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
      validate: {
        emailState: ""
      },
      validationMessage: "",
      toggleAlert: "",
      modalAlert: false,
      contentAlert: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.validatePass = this.validatePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.changeContentAlert = this.changeContentAlert.bind(this);
  }

  changeContentAlert(content) {
    this.setState({ contentAlert: content });
    this.toggleAlert();
  }

  toggleAlert() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  validateForm() {
    return (
      this.state.currentPass.length > 0 &&
      this.state.newPass.length > 0 &&
      this.state.confirmNewPass.length > 0 &&
      this.state.validationMessage.length === 0 &&
      this.state.newPass === this.state.confirmNewPass
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validatePass(e) {
    let validationMessage = "";
    if (e.target.value.length < 8) {
      validationMessage = "Mínimo 8 caracteres";
    } else if (!/[A-z]/.test(e.target.value)) {
      validationMessage = "Mínimo una letra";
    } else if (!/\d/.test(e.target.value)) {
      validationMessage = "Mínimo un número";
    }
    const { validate } = this.state;

    if (validationMessage === "") {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
    this.setState({ validationMessage: validationMessage });
  }

  handleSubmit(e) {
    var valueSession = JSON.parse(sessionStorage.getItem(SESSION));
    cambiarClave(
      this.state.currentPass,
      this.state.newPass,
      this.state.confirmNewPass,
      valueSession.idRecaudador,
      valueSession.loginUsuario
    )
      .then(response => {
        console.log(response);
        if (response) {
          this.changeContentAlert("La contraseña se cambió correctamente");
          this.props.toggle();
        } else {
          this.changeContentAlert(
            "La contraseña no se ha cambiado, verifique que la contraseña actual sea correcta.  La nueva contraseña debe ser diferente a las últimas cinco asignadas."
          );
          this.props.toggle();
        }
        this.setState({ currentPass: "", newPass: "", confirmNewPass: "" });
      })
      .catch(error => {
        this.changeContentAlert(
          "El sistema se encuentra cerrado, intente mas tarde."
        );
        this.props.toggle();
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
                <div className="container">Cambiar contraseña</div>
              </div>
            </div>
            <br />
            <form>
              <div className="form-group list-print">
                <InputTextFmb
                  icon="fas fa-key"
                  type="password"
                  name="currentPass"
                  placeholder="Ingrese la contraseña actual"
                  value={this.state.currentPass}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group list-print has-icon">
                <span className="fas fa-key form-control-feedback" />
                <Input
                  type="password"
                  name="newPass"
                  placeholder="Ingrese la nueva contraseña"
                  value={this.state.newPass}
                  invalid={this.state.validate.emailState === "has-danger"}
                  onChange={e => {
                    this.handleChange(e);
                    this.validatePass(e);
                  }}
                />
                <FormFeedback>{this.state.validationMessage}</FormFeedback>
              </div>
              <div className="form-group list-print">
                <InputTextFmb
                  icon="fas fa-key"
                  type="password"
                  name="confirmNewPass"
                  placeholder="Ingrese la nueva contraseña"
                  value={this.state.confirmNewPass}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group list-print">
                <ButtonFmb
                  name="Cambiar contraseña"
                  icon="far fa-check-circle"
                  onClick={this.handleSubmit}
                  disabled={!this.validateForm()}
                />
              </div>
            </form>
          </ModalBody>
        </Modal>

        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content={this.state.contentAlert}
        />
      </div>
    );
  }
}

export default ModalChangePassword;
