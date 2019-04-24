import axios from "axios";
import { conexion } from "../utils/Parameters";

export var login = () => {
  //$http.post(URL_WS + EP_VALIDAR_API);
  //$autenticacion.validarAPI().success(function (response, status, headers, config) {

  axios
    .post(conexion.URL_WS + conexion.EP_VALIDAR_API, {
      // nota: nota
    })
    .then(function(response) {
      if (response) {
        alert("olas");
      }
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
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
