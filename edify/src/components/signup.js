import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      form: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        imageFile: null,
        courses: [],
        user: "",
        bio: "",
      },
      formErrors: {
        firstname: "",
        lastname: "",
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null,
        user: null,
        imageFile: null,
        courses: null,
      },
    };
  }

  // componentDidMount() {
  //   // Simple POST request with a JSON body using fetch
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: "React POST Request Example" }),
  //   };
  //   fetch("http://localhost:3000/students/", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => this.setState({ postId: data.id }));
  // }

  //   Validations of the form

  onhandleChange = (e) => {
    const { name, value, selectedFile } = e.target;
    const { form, formErrors } = this.state;
    let formObject = {};

    // handle change event
    formObject = {
      ...form,
      [name]: value,
    };

    this.setState({ form: formObject }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObject = {};
      if (name === "password" || name === "confirmPassword") {
        let repasswordValue =
          this.state.form[name === "password" ? "confirmPassword" : "password"];
        const errorMsg = this.validations(name, value, repasswordValue);
        formErrorsObject = { ...formErrors, [name]: errorMsg };
        if (!errorMsg && repasswordValue) {
          formErrorsObject.confirmPassword = null;
          formErrorsObject.password = null;
        }
      } else {
        const errorMsg = this.validations(name, value);
        formErrorsObject = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorsObject });
    });
  };

  uploadImage = (e) => {
    console.log(e.target);
    const image = e.target.files[0];
    const { form, formErrors } = this.state;
    let formObject = {};

    // handle change event
    formObject = {
      ...form,
      ["imageFile"]: image,
    };
    this.setState({ form: formObject }, () => {
      if (!Object.keys(formErrors).includes("imageFile")) return;
      let formErrorsObject = {};

      const errorMsg = this.validations("imageFile", image);
      formErrorsObject = { ...formErrors, ["imageFile"]: errorMsg };
      this.setState({ formErrors: formErrorsObject });
    });
  };

  validations = (name, value, refValue) => {
    let errorMessage = null;
    switch (name) {
      case "firstname":
        if (!value) errorMessage = "Please enter First Name.";
        break;
      case "lastname":
        if (!value) errorMessage = "Please enter Last  Name.";
        break;
      case "email":
        if (!value) errorMessage = "Please enter Email.";
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          errorMessage = "Please enter valid Email.";
        break;
      case "mobile":
        if (!value) errorMessage = "Please enter Mobile.";
        else if (!/[1-9]{1}[0-9]{9}$/.test(value))
          errorMessage = "Please enter valid Mobile no.";
        break;
      case "user":
        if (!value) errorMessage = "Please select user type.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMessage = "Please enter Password.";
        else if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+])[a-zA-Z0-9!@#$%^&*+]{6,}$/.test(
            value
          )
        )
          errorMessage =
            "The password field should contain at least six characters, one uppercase letter, one number and one special character (!,@,#,$,%,^,&,*,+).";
        else if (refValue && value !== refValue)
          errorMessage = "Password and Confirm Password does not match.";
        break;
      case "confirmPassword":
        // refValue is the value of Password field
        if (!value) errorMessage = "Please enter Confirm Password.";
        else if (refValue && value !== refValue)
          errorMessage = "Password and Confirm Password does not match.";
        break;
      case "courses":
        if (!value[0]) errorMessage = "Please enter Courses.";
        break;
      case "imageFile":
        console.log("inside", value);
        if (!value.name.match(/\.(jpg|jpeg|png)$/))
          errorMessage = "Please select valid image.";
        break;
      default:
        break;
    }
    console.log("error:", name, errorMessage);
    return errorMessage;
  };

  //validating phone number
  validateMobileNo = (e) => {
    if (e.type === "paste") {
      number = e.clipboardData.getData("text/plain");
    } else {
      var number = e.keyCode || e.which;
      number = String.fromCharCode(number);
    }
    var regex = "[1-9]{1}[0-9]{9}";
    if (!regex.test(number)) {
      e.returnValue = false;
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;
    if (form.user === "tutor") {
      form.imageFile = this.state.selectedFile;
    }
    const errorObj = this.formValidation(form, formErrors, this.validations);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    console.log("Courses:", form.courses);
    if (form.user === "tutor") {
      form.courses = form.courses.split(",");
    }
    console.log("Courses:", form.courses);
    console.log("Data: ", form);

    const base_url = "http://localhost:3000/students/";
    const data = {
      first_name: form.firstname,
      last_name: form.lastname,
      bio: form.textarea,
      mobile: form.mobile,
      email: form.email,
      favourite_tutors: [1, 2],
    };
    axios
      .post(base_url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log(JSON.stringify(data));
  };

  formValidation = (form, formErrors, validationsFunction) => {
    const errorObj = {};
    Object.keys(formErrors).map((attribute) => {
      let refValue = null;
      if (attribute === "password" || attribute === "confirmPassword") {
        refValue =
          form[attribute === "password" ? "confirmPassword" : "password"];
      }

      if (
        !(
          (attribute === "courses" || attribute === "imageFile") &&
          form["user"] === "student"
        )
      ) {
        console.log("value", form["imageFile"]);

        const msg = validationsFunction(attribute, form[attribute], refValue);
        if (msg) errorObj[attribute] = msg;
      }
    });
    return errorObj;
  };

  render() {
    const { form, formErrors } = this.state;
    return (
      <div>
        <Header />
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center mt-5">
            <div class="p-sm-5">
              <div class="row d-flex justify-content-center order-2 pd-3">
                <div
                  class=" login col-sm-5"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "15px",
                  }}
                >
                  <h3>SignUp</h3>

                  <div className="col-md-6">
                    <div className="form-group">
                      <i class="bi bi-person-fill me-3 icon iconAppoint"></i>
                      <label>
                        First Name:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {formErrors.firstname && (
                        <span className="err">{formErrors.firstname}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <i class="bi bi-envelope-fill me-3 icon iconAppoint"></i>
                      <label>
                        Email:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {formErrors.email && (
                        <span className="err">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <i class="bi bi-key-fill me-3 icon iconAppoint"></i>
                      <label>
                        Password:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {formErrors.password && (
                        <span className="err">{formErrors.password}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Bio:</label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="textarea"
                        value={form.textarea}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {/* {formErrors.textarea && (
                        <span className="err">{formErrors.textarea}</span>
                      )} */}
                    </div>

                    {/* //image code */}
                    <div aria-hidden={form.user !== "tutor" ? true : false}>
                      <div className="form-group">
                        <p className="title">Upload Profile Picture:</p>
                        <div style={{ marginBottom: 10 }}>
                          <input
                            type="file"
                            name="selectedFile"
                            value={form.selectedFile}
                            onChange={this.uploadImage}
                          />
                        </div>
                        {formErrors.imageFile && (
                          <span className="err">{formErrors.imageFile}</span>
                        )}
                      </div>
                    </div>

                    {/* submit */}
                    <div className="form-group ">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm m-1 submit"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  {/* second column */}
                  <div className="col-md-6">
                    {/* Last Name */}
                    <div className="form-group">
                      <i class="bi bi-person-fill me-3 icon iconAppoint"></i>
                      <label>
                        Last Name:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastname"
                        value={form.name}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {formErrors.lastname && (
                        <span className="err">{formErrors.lastname}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <i class="bi bi-telephone-fill me-3 icon iconAppoint"></i>
                      <label>
                        Mobile:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="mobile"
                        value={form.mobile}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                        onKeyPress={this.validateMobileNo}
                      />
                      {formErrors.mobile && (
                        <span className="err">{formErrors.mobile}</span>
                      )}
                    </div>

                    {/* confirm password */}
                    <div className="form-group">
                      <i class="bi bi-key-fill me-3 icon iconAppoint"></i>
                      <label>
                        Confirm Password:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={this.onhandleChange}
                        onBlur={this.onhandleChange}
                      />
                      {formErrors.confirmPassword && (
                        <span className="err">
                          {formErrors.confirmPassword}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="mr-3">
                        User:<span className="asterisk">*</span>
                      </label>
                      <div className="form-control border-0 p-0 pt-1">
                        <label className="mr-2">
                          <input
                            type="radio"
                            name="user"
                            value="student"
                            checked={form.user === "student"}
                            onChange={this.onhandleChange}
                          />{" "}
                          Student
                        </label>
                        <br />
                        <label>
                          <input
                            type="radio"
                            name="user"
                            value="tutor"
                            checked={form.user === "tutor"}
                            onChange={this.onhandleChange}
                          />{" "}
                          Tutor
                        </label>
                      </div>
                      {formErrors.user && (
                        <span className="err">{formErrors.user}</span>
                      )}
                    </div>

                    <div aria-hidden={form.user !== "tutor" ? true : false}>
                      <div className="form-group">
                        <label>
                          Courses:<span className="asterisk">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="courses"
                          value={form.courses}
                          onChange={this.onhandleChange}
                          onBlur={this.onhandleChange}
                        />
                        {formErrors.courses && (
                          <span className="err">{formErrors.courses}</span>
                        )}
                      </div>
                    </div>
                    {/* //end of signup form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SignUp;
