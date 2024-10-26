import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Student() {
  let [uName, setUName] = useState("");
  let [password, setPassword] = useState("");
  let handleSubmit = (event) => {
    event.preventDefault();
  };
  let getUName = (event) => {
    setUName(event.target.value);
  };

  //getting and placing data fields in form
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
    index: "",
  });
  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let [userData, setUserData] = useState([]);

  let handleSubmit2 = (event) => {
    let currUserFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      msg: formData.msg,
    };
    //Insertion
    if (formData.index === "") {
      //email/phone already exists? then adding currently entered data obj in previous entered objs array
      let checkFilterUser = userData.filter(
        (v) => v.email == formData.email || v.phone == formData.phone
      );
      if (checkFilterUser.length == 1) {
        toast.error("Email or Phone no. already exists!");
      } else {
        let oldUserData = [...userData, currUserFormData]; //old array + new array element
        setUserData(oldUserData);

        setFormData({
          name: "",
          email: "",
          phone: "",
          msg: "",
          index: "",
        });
      }
    }
    //Updation
    else {
      let editIndex = formData.index;
      let userDataCopy = userData;
      //email/phone already exists? then updating currently entered data obj in previous entered objs array
      let checkFilterUser = userData.filter(
        (v, i) =>
          v.email == formData.email ||
          (v.phone == formData.phone && i != editIndex)
      );
      if (checkFilterUser.length == 1) {
        toast.error("Email or Phone no. already exists!");
      }
      //Data going from form to table
      else {
        userDataCopy[editIndex]["name"] = formData.name;
        userDataCopy[editIndex]["email"] = formData.email;
        userDataCopy[editIndex]["phone"] = formData.phone;
        userDataCopy[editIndex]["msg"] = formData.msg;
        setUserData(userDataCopy);
        setFormData({
          name: "",
          email: "",
          phone: "",
          msg: "",
          index: "",
        });
      }
    }

    event.preventDefault();
  };

  let deleteRow = (index) => {
    let filterAfterDel = userData.filter((v, i) => i != index);
    toast.success("Data deleted successfully!");
    setUserData(filterAfterDel);
  };

  //Data going from table to form
  let editRow = (index) => {
    let editData = userData.filter((v, i) => i == index)[0];
    editData["index"] = index;
    setFormData(editData);
  };
  return (
    <div className="App">
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="text-start my-3">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  value={uName}
                  onChange={getUName}
                />
              </div>
              <div className="text-start my-3">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="text-start my-3">
                <button>Login</button>
              </div>
            </form>

            <form onSubmit={handleSubmit2}>
              <div className="pb-3">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={getValue}
                />
              </div>
              <div className="pb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={getValue}
                />
              </div>
              <div className="pb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={getValue}
                />
              </div>
              <div className="pb-3">
                <label>Message</label>
                <textarea
                  className="form-control"
                  name="msg"
                  value={formData.msg}
                  onChange={getValue}
                />
              </div>
              <div className="pb-3">
                <button className="btn btn-primary">
                  {formData.index !== "" ? "Update" : "Save"}
                </button>
              </div>
            </form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{obj.name}</td>
                        <td>{obj.phone}</td>
                        <td>{obj.email}</td>
                        <td>{obj.msg}</td>
                        <td>
                          <button onClick={() => deleteRow(i)}>Delete</button>
                          <button onClick={() => editRow(i)}>Update</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td colSpan={6}>No Data Found</td>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
