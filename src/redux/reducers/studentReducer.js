let initialState = {
  name: "Zara",
  email: "zara@email.com",
  phone: "032257551687",
  message: "Hi!",
};

function studentReducer(state = initialState, action) {
  switch (action.type) {
    case "Add_Student":
      let newState = {
        ...state,
        name: "Zahra",
        newData: action.payload,
      };
      return newState;
    default:
      return state;
  }
}

export default studentReducer;
