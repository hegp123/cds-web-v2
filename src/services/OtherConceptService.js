import axios from "axios";

export let getConcepts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_FACTURAS +
          factura +
          "/" +
          puntoReca +
          "/" +
          idRecaudador
      )
      .then(response => {
        if (response) {
          resolve(response.data);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject("error");
      });
  });
};
