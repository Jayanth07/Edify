import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: "",
        password: "",
      },
      formErrors: {
        email: null,
        password: null,
      },
    };
  }

  onhandleChange = (e) => {
    const { name, value } = e.target;
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
      const errorMsg = this.validations(name, value);
      formErrorsObject = { ...formErrors, [name]: errorMsg };
      this.setState({ formErrors: formErrorsObject });
    });
  };

  validations = (name, value) => {
    let errorMessage = null;
    switch (name) {
      case "email":
        if (!value) errorMessage = "Please enter Email.";
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          errorMessage = "Please enter valid Email.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMessage = "Please enter Password.";
        break;
      default:
        break;
    }
    console.log("error:", name, errorMessage);
    return errorMessage;
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;

    const errorObj = this.formValidation(form, formErrors, this.validations);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    console.log("Data: ", form);
  };

  formValidation = (form, formErrors, validationsFunction) => {
    const errorObj = {};
    Object.keys(formErrors).map((attribute) => {
      console.log("value", form["imageFile"]);
      const msg = validationsFunction(attribute, form[attribute]);
      if (msg) errorObj[attribute] = msg;
    });
    return errorObj;
  };

  render() {
    const { form, formErrors } = this.state;
    return (
      <>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center mt-5">
            <div class="p-sm-5">
              <div class="row d-flex justify-content-center order-2 pd-3">
                <div class=" login col-sm-5">
                  <h3>Login</h3>

                  <div className="form-group">
                    <i class="bi bi-envelope-fill me-3 icon"></i>
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
                    <i class="bi bi-key-fill me-3 icon"></i>
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

                  <div className="form-group ">
                    <input
                      type="button"
                      className="btn submit"
                      value="Login"
                      onClick={this.handleSubmit}
                    />
                  </div>

                  <p style={{ textAlign: "center" }}>
                    Not a User? &nbsp;{" "}
                    <span style={{ color: "blue" }}>SignUp</span>
                    {/* <Link from="/" to='/register' >Sign Up</Link > */}
                  </p>
                </div>
                {/* //end of login form */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
