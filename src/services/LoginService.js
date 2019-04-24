import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";
import Base64 from "base-64";

export const LoginService = {
  logout,
  login: loginData => {
    axios
      .post(conexion.URL_WS + ws_api.EP_VALIDAR_API, {})
      .then(response => {
        if (response) {
          //alert("estado: " + response.data.estado);
          if (response.data.appVersion == null) {
            alert("Hubo un error en el API, pero el api no muestra nada :( ");
          } else {
            //aca vamos bien
            // alert("appVersion: " + response.data.appVersion);
            let user = loginData.user;
            let password = Base64.encode(loginData.password);
            alert(`User: ${user}   Password: ${password}`);
            // $http.post(URL_WS + EP_SESION, usuario);
          }
        }
        console.log(response);
      })
      .catch(function(error) {
        alert(error.message);
        console.log(error.message);
      });
  }
};

function logout(historyPush) {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
}
export default LoginService;
/*
axios
.get("http://localhost:8000/notas")
.then(res => {
  let nota = res.data.notas;

  this.setState({
    notas: nota
  });
})
.catch(err => {
  console.log(err);
});*/
