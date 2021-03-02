export const LoginAction = (input) => {
  //input = expectasi object
  return {
    type: "LOGIN",
    payload: input,
  };
};
