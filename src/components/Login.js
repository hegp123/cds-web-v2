import React, { Component } from "react";
import Base64 from "base-64";
import "../css/Login.css";
import logo from "../img/appIcon.png";
import ButtonFmb from "./ButtonFmb";
import InputTextFmb from "./InputTextFmb";
import { validateAPI, login } from "../services/LoginService";
import ModalAlert from "./modal/ModalAlert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      loginAttempts: 0,
      modalAlert: false,
      modalAlertContent: ""
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
            <img src={logo} className="appIconLog" />
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
        alert(error);
      });

    sessionStorage.setItem("user", "user");
    this.props.history.push("/payment");
  }

  /**
   *
   */
  showAlert = message => {
    this.setState({
      modalAlertContent: message
    });
    this.toggleAlert();
  };

  /**
   *
   */
  validateUserDate = (userData, loginAttempts) => {
    if (loginAttempts < 5) {
      if (userData.logueado) {
        if (userData.puntoBloqueado !== 0) {
          alert(
            "Su punto de recaudo se encuentra bloqueado por Conciliación (consignación). Tan pronto se valide su pago será habilitado."
          );
        } else if (userData.puntoCerrado !== 0) {
          alert("Su punto de recaudo se encuentra cerrado.");
        } else if (userData.estadoSucursalPrincipal !== "A") {
          alert(
            "La sucursal principal se encuentra cerrada, por favor intente de nuevo más tarde."
          );
        } else {
          //let d1 = moment(new Date());
          // let d2 = moment(userData.fechaCambioClave, "YYYYMMDD");

          let diasCambio = 20; // Moment.duration(d1.diff(d2)).asDays();

          if (
            userData.mensajePantalla !== null &&
            userData.mensajePantalla !== ""
          ) {
            alert(userData.mensajePantalla);
          }

          if (
            userData.mensajeResolucion !== null &&
            userData.mensajeResolucion !== ""
          ) {
            alert(userData.mensajeResolucion);
          }

          if (userData.forzarCambioClave === 1 || diasCambio >= 60) {
            this.asignarSesion("sesion", userData);
            //$scope.modalCambiarContrasenha.show();
            alert("debe cambiar la contraseña");
          } else {
            this.asignarSesion("sesion", userData);
            // $state.go("tab.pagos");
            this.showAlert("TODO: redireccionar a payment");
            //alert("TODO: redireccionar a payment");
          }
        }
      } else {
        //intentos_login += 1;
        //$ionicLoading.hide();
        this.showAlert(`El nombre de usuario o la contraseña son incorrectos`);

        // document.getElementById("btnLogin").disabled = false;
      }
    } else {
      this.showAlert(
        `Máximo número de intentos de inicio de sesión superado, favor ingresar a la aplicación e intente de nuevo.`
      );
    }
  };

  asignarSesion = (llave, valor) => {
    //$window.localStorage[llave] = JSON.stringify(valor);
    //alert(`asignar al local storage llave: ${llave}    valor: ${valor}`);
    // this.showAlert(
    //`asignar al local storage llave: ${llave}    valor: ${valor}`
    // );
  };
}

export default Login;
