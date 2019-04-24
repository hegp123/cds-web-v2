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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    sessionStorage.setItem("user", "user");
    this.props.history.push("/payment");
  }

  render() {
    //localStorage.clear();
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
          />
        </form>
      </div>
    );
  }
}

export default Login;
