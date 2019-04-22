import React, { Component } from "react";
import "./App.css";
import logo from "./img/appIcon.png";

class App extends Component {
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
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Usuario"
            />
          </div>
          <div className="form-group, labelLogin">Contraseña</div>
          <div className="form-group">
            <input
              type="text"
              name="responsible"
              className="form-control"
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            {" "}
            <i class="fa fa-unlocked" />Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }
}

export default App;
