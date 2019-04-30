import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarPorCC = (cedula, idPunto) => {
  return new Promise((resolve, reject) => {
    axios
      .get(conexion.URL_WS + ws_api.EP_CREDITOS_CC + cedula + "/" + idPunto)
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("creo que aca nunca se va a meter");
          } else {
            resolve(response.data);
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// function buscarPorCC(cedula, idPunto) {
//     return $http.get(URL_WS + EP_CREDITOS_CC + cedula + "/" + idPunto);
// }

// function buscarPorCredito(credito, idPunto, purePrejuridico) {
//     return $http.get(URL_WS + EP_CREDITOS_CREDITO + credito + "/" + idPunto);
// }

// function buscarPorSeleccion(credito, cuota, idproducto, tac, porVencer) {
//     return $http.get(URL_WS + EP_CREDITOS_SELECCION + credito + "/" + cuota + "/" + idproducto + "/" + tac + "/" + porVencer);
// }

// function buscarPorNombre(nombre) {
//     return $http.get(URL_WS + EP_CREDITOS_NOMBRE + nombre);
// }

// function pagarCredito(pago) {
//     return $http.get(URL_WS + EP_CREDITOS_PAGAR + "/" + pago.cuenta + "/" + pago.operacion + "/" + pago.sucursal + "/" + pago.producto + "/" +
//             pago.valor + "/" + pago.idRecaudador + "/" + pago.tac + "/" + pago.pure + "/" + pago.cuota + "/" + pago.porVencer);
// }

// function infoPagosCredito(cuenta) {
//     return $http.get(URL_WS + EP_CREDITOS_INFO + cuenta);
// }
