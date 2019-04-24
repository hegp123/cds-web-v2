export const LoginService = {
  logout
};

function logout(historyPush) {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
}

export default LoginService;
