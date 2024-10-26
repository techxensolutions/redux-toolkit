import Student from "./Modules/students/Student";
import { useSelector } from "react-redux";
function App() {
  const studentData = useSelector((state) => state.studentReducer);
  console.log("Student Data:", studentData);
  return <Student />;
}

export default App;
