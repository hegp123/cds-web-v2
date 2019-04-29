import React, { Component } from "react";
import Base64 from "base-64";
import "../css/Login.css";
import logo from "../img/appIcon.png";
import ButtonFmb from "./ButtonFmb";
import InputTextFmb from "./InputTextFmb";
import ModalAlert from "./modal/ModalAlert";
import { validateAPI, login } from "../services/LoginService";
import { logout } from "../utils/Utils";
import { SESSION } from "../utils/Constants";
import { PAYMENT } from "../utils/Paths";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      loginAttempts: 0,
      modalAlert: false,
      modalAlertContent: "",
      callbackOnClosed: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleAlert() {
    this.setState(prevState => ({
      modalAlert: !prevState.modalAlert
    }));
  }

  render() {
    //localStorage.clear();
    return (
      <div className="App">
        <form className="container">
          <div className="form-group">
            <img src={logo} className="appIconLog" alt="" />
          </div>
          <div className="form-group">
            <div class="headerLogin">Iniciar Sesión </div>
          </div>
          <div className="form-group, labelLogin">Usuario</div>
          <div className="form-group">
            <InputTextFmb
              type="text"
              icon="fa fa-user"
              name="user"
              placeholder="Usuario"
              value={this.state.user}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group, labelLogin">Contraseña</div>
          <div className="form-group">
            <InputTextFmb
              icon="fas fa-key"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <ButtonFmb
            name="Iniciar Sesión"
            disabled={this.validateForm()}
            icon="fa fa-unlock"
            onClick={this.handleSubmit}
          />
        </form>
        <ModalAlert
          toggle={this.toggleAlert}
          isOpen={this.state.modalAlert}
          content={this.state.modalAlertContent}
          callbackOnClosed={this.state.callbackOnClosed}
        />
      </div>
    );
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#872175";
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.password.length > 0;
  }

  handleSubmit() {
    var user = {
      loginUsuario: this.state.user,
      claveUsuario: Base64.encode(this.state.password)
    };
    let loginAttempts = this.state.loginAttempts;
    //login process
    validateAPI()
      .then(() => {
        return login(user);
      })
      .then(userData => {
        this.validateUserDate(userData, loginAttempts);
      })
      .catch(error => {
        this.showAlert(error);
      });
  }

  /**
   *
   */
  validateUserDate = (userData, loginAttempts) => {
    //siempre lo inicializamos en vacio, porque el callback onclose esto solo lo utilizan varios en la alertMessage
    this.setState({
      callbackOnClosed: ""
    });
    let moment = require("moment");
    if (loginAttempts < 5) {
      if (userData.logueado) {
        if (userData.puntoBloqueado !== 0) {
          this.showAlert(
            "Su punto de recaudo se encuentra bloqueado por Conciliación (consignación). Tan pronto se valide su pago será habilitado.",
            logout.bind(this, this.props.history)
          );
        } else if (userData.puntoCerrado !== 0) {
          this.showAlert(
            "Su punto de recaudo se encuentra cerrado.",
            logout.bind(this, this.props.history)
          );
        } else if (userData.estadoSucursalPrincipal !== "A") {
          this.showAlert(
            "La sucursal principal se encuentra cerrada, por favor intente de nuevo más tarde.",
            logout.bind(this, this.props.history)
          );
        } else {
          localStorage.removeItem(SESSION);

          let d1 = moment(new Date());
          let d2 = moment(userData.fechaCambioClave, "YYYYMMDD");
          let diasCambio = moment.duration(d1.diff(d2)).asDays();

          if (
            userData.mensajePantalla !== null &&
            userData.mensajePantalla !== ""
          ) {
            this.showAlert(userData.mensajePantalla);
          }

          if (
            userData.mensajeResolucion !== null &&
            userData.mensajeResolucion !== ""
          ) {
            this.showAlert(userData.mensajeResolucion);
          }

          if (userData.forzarCambioClave === 1 || diasCambio >= 60) {
            this.asignarSesion(SESSION, userData);
            //$scope.modalCambiarContrasenha.show();
            //TODO: aca debe abrir la modal
          } else {
            this.asignarSesion(SESSION, userData);
            // $state.go("tab.pagos");
            this.props.history.push(PAYMENT);
          }
        }
      } else {
        loginAttempts += 1;
        this.showAlert(`El nombre de usuario o la contraseña son incorrectos`);

        // document.getElementById("btnLogin").disabled = false;
      }
    } else {
      this.showAlert(
        `Máximo número de intentos de inicio de sesión superado, favor ingresar a la aplicación e intente de nuevo.`
      );
    }
  };

  /**
   *
   */
  showAlert = (message, callback) => {
    this.setState({
      modalAlertContent: message,
      callbackOnClosed: callback
    });

    this.toggleAlert();
  };

  asignarSesion = (llave, valor) => {
    sessionStorage.setItem(llave, JSON.stringify(valor));
  };
}

export default Login;
