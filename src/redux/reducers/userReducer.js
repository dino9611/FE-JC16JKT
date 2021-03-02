const INITIAL_USER = { id: 0, username: "", email: "", islogin: false };

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, islogin: true };
    case "LOGOUT":
      return INITIAL_USER;
    default:
      return state;
  }
};
export default userReducer;
