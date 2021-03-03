export const LoginAction = (input) => {
  //input = expectasi object
  return {
    type: "LOGIN",
    payload: input,
  };
};

export const LogoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
