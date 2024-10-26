//action will be received from react component and passed to reducer
const addStudent = (data) => {
  return {
    type: "Add_Student",
    payload: data,
  };
};
