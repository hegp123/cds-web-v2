import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export const LoginService = {
  logout,
  login: user => {
    validateAPI()
      .then(() => {
        return login(user);
      })
      .then(data => {
        alert(`logueo?  ${data.logueado}`);
      })
      .catch(error => {
        alert(error);
      });
  }
};

function logout(historyPush) {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
}

/**
 * Consume servicio web Validate
 */
let validateAPI = () => {
  return new Promise((resolve, reject) => {
    axios.post(conexion.URL_WS + ws_api.EP_VALIDAR_API, {}).then(response => {
      if (response) {
        if (response.data.appVersion == null) {
          reject("Hubo un error en el API, pero el api no muestra nada :( ");
        } else {
          resolve(response);
        }
      }
    });
  });
};

/**
 * Consume servicio web Login
 * @param {json con usuario y password} user
 */
let login = user => {
  return new Promise((resolve, reject) => {
    axios.post(conexion.URL_WS + ws_api.EP_SESION, user).then(response => {
      if (response) {
        if (!response.data.logueado) {
          reject("No se pudo loguear :( ");
        } else {
          resolve(response.data);
        }
      }
    });
  });
};

export default LoginService;
