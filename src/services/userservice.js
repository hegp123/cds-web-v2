export const Userservice = {
  logout
};

function logout(historyPush) {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
}

export default Userservice;
