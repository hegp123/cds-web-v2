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

export let buscarPorSeleccion = (
  credito,
  cuota,
  idproducto,
  tac,
  porVencer
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_CREDITOS_SELECCION +
          credito +
          "/" +
          cuota +
          "/" +
          idproducto +
          "/" +
          tac +
          "/" +
          porVencer
      )
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

export let infoPagosCredito = cuenta => {
  return new Promise((resolve, reject) => {
    axios
      .get(conexion.URL_WS + ws_api.EP_CREDITOS_INFO + cuenta)
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

export let pagarCredito = pago => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_CREDITOS_PAGAR +
          "/" +
          pago.cuenta +
          "/" +
          pago.operacion +
          "/" +
          pago.sucursal +
          "/" +
          pago.producto +
          "/" +
          pago.valor +
          "/" +
          pago.idRecaudador +
          "/" +
          pago.tac +
          "/" +
          pago.pure +
          "/" +
          pago.cuota +
          "/" +
          pago.porVencer
      )
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

// function buscarPorCredito(credito, idPunto, purePrejuridico) {
//     return $http.get(URL_WS + EP_CREDITOS_CREDITO + credito + "/" + idPunto);
// }

// function buscarPorNombre(nombre) {
//     return $http.get(URL_WS + EP_CREDITOS_NOMBRE + nombre);
// }
