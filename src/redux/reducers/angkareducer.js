const INITIAL_STATE = 755;

const AngkaReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TAMBAH":
      return state + action.payload;
    case "KURANG":
      return state - 1;
    default:
      return state;
  }
};

export default AngkaReducers;
