import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export const LoginService = {
  logout,
  login: (user, loginAttempts) => {
    alert(`tales2: ${loginAttempts}`);
    validateAPI()
      .then(() => {
        return login(user);
      })
      .then(userData => {
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
              //let d2 = moment(userData.fechaCambioClave, "YYYYMMDD");

              alert("ilas que toca hacer un calculo");
              let diasCambio = 20; // moment.duration(d1.diff(d2)).asDays();

              if (
                userData.mensajePantalla !== null &&
                userData.mensajePantalla !== ""
              ) {
                alert(userData.mensajePantalla);
              }

              if (userData.mensajeResolucion !== "") {
                alert(userData.mensajeResolucion);
              }

              if (userData.forzarCambioClave === 1 || diasCambio >= 60) {
                asignarSesion("sesion", userData);
                //$scope.modalCambiarContrasenha.show();
                alert("debe cambiar la contraseña");
              } else {
                asignarSesion("sesion", userData);
                // $state.go("tab.pagos");
                alert("TODO: redireccionar a payment");
              }
            }
          }
        }
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

let asignarSesion = (llave, valor) => {
  //$window.localStorage[llave] = JSON.stringify(valor);
  alert(`asignar al local storage llave: ${llave}    valor: ${valor}`);
};

export default LoginService;
