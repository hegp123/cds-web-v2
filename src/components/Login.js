import React, { Component } from "react";
import "../css/Login.css";
import logo from "../img/appIcon.png";
import ButtonFmb from "./ButtonFmb";
import InputTextFmb from "./InputTextFmb";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: ""
    };
    //this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="App">
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <img src={logo} className="appIconLog" />
          </div>
          <div className="form-group">
            <div class="headerLogin">Iniciar Sesión </div>
          </div>
          <div className="form-group, labelLogin">Usuario</div>
          <div className="form-group">
            <InputTextFmb
              name="Titulo"
              placeholder="Usuario"
              value={this.state.user}
              onChange={this.handleChange("user")}
            />
          </div>
          <div className="form-group, labelLogin">Contraseña</div>
          <div className="form-group">
            <input
              type="text"
              name="responsible"
              className="form-control"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
          </div>
          <ButtonFmb name="Iniciar Sesión" disabled={this.validateForm()} />
        </form>
      </div>
    );
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.password.length > 0;
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = event => {
    alert(this.state.user + "    -  " + this.state.password);
    event.preventDefault();
  };
}

export default Login;
