/**
 * desloguea de la aplicacion
 * @param {redirect} historyPush
 */
export let logout = historyPush => {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
};
