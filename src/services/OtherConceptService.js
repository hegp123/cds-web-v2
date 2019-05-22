import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let getInfoConcept = otherConcept => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_OTRO, otherConcept)
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
