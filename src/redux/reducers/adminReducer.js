let initialState = {
  isLogin: true,
  user: { name: "Hiba", email: "hiba@gmaiil.com" },
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case "User_Login":
      let newState = {
        ...state,
        isLogin: true,
        newData: action.payload,
      };
      return newState;
    default:
      return state;
  }
}

export default adminReducer;
