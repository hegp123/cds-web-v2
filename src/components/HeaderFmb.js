import React, { Component } from "react";

import movil from "../img/cdsMovil.png";
import icon from "../img/appIconMore.png";
import { withRouter } from "react-router";
import "../css/HeaderFmb.css";
import { logout } from "../utils/Utils";
import { SESSION } from "../utils/Constants";
import ModalChangePassword from "./modal/ModalChangePassword";

class HeaderFmb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sesion: {},
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    var valueSession = JSON.parse(sessionStorage.getItem(SESSION));
    this.setState({ sesion: valueSession });
  }

  render() {
    var title = "Registrar pago";
    if (this.props.type === "print") {
      title = "Reimprimir orden de recibo";
    } else if (this.props.type === "report") {
      title = "Reporte de pagos";
    } else if (this.props.type === "paymentPrint") {
      title = "Pago realizado con éxito";
    } else if (this.props.type === "otherConcept") {
      title = "Pago otros conceptos";
    }

    return (
      <div>
        <nav className="navbar navbar-expand navbar-light app">
          <div className="collapse navbar-collapse" />

          <a className="navbar-brand mx-auto" href="#">
            <div id="logo">
              <img src={movil} />
            </div>
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img className="img-profile rounded-circle" src={icon} />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <div className="dropdown-item letra-usuario">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  {this.state.sesion.nombreUsuario}
                </div>
                <a
                  className="dropdown-item letra-menu"
                  href="#"
                  onClick={this.toggle}
                >
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                  Cambiar Contraseña
                </a>
                <a className="dropdown-item letra-menu" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                  Probar impresora
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item letra-menu"
                  href="#"
                  onClick={logout.bind(this, this.props.history)}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Cerrar sesión
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="navbar navbar-default navbar-fixed-top subHeader">
          <div className="navbar-header">
            <div className="container">{title}</div>
          </div>
        </div>

        <ModalChangePassword toggle={this.toggle} isOpen={this.state.modal} />
      </div>
    );
  }
}

HeaderFmb = withRouter(HeaderFmb);
export default HeaderFmb;
