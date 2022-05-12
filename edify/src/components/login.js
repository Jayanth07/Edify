import React, { Component } from "react";
import { connect } from 'react-redux'
import { PATH } from './../constants/appConstants'
import { Link } from "react-router-dom"
import Header from '../components/header'
import Footer from '../components/footer'
import { setLoginState } from "../redux/actions";

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
      loginError: ''
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

    fetch('http://localhost:3000/loginsignup/login', {
      method: 'post',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
		})
		.then( res => res.json() )
		.then( (data) => {
      console.log('Login success')
      console.log(data)
      if (data.error) {
        this.setState({loginError: data.error})
        return;
      }
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('userType', data.user_type)
      setLoginState(data.token, data.user_type)
      window.location.href = 'http://localhost:3001/';
		})
		.catch((e) => {
      console.log(e)
    })
  };

  formValidation = (form, formErrors, validationsFunction) => {
    const errorObj = {};
    Object.keys(formErrors).map((attribute) => {
      const msg = validationsFunction(attribute, form[attribute]);
      if (msg) errorObj[attribute] = msg;
    });
    return errorObj;
  };

  render() {
    console.log(this.state)
    const { form, formErrors } = this.state;
    return (
      <div>
        <Header/>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center mt-5">
            <div class="p-sm-5">
              <div class="row d-flex justify-content-center order-2 pd-3">
                <div class=" login col-sm-5" style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "15px",
                }}>
                  <h3>Login</h3>

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

                  <div className="form-group ">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm m-1 submit"
                      onClick={this.handleSubmit}
                    >Login</button>
                  </div>

                  <span className="err">{this.state.loginError}</span>

                  <p style={{ textAlign: "center" }}>
                    Not a User?&nbsp;{" "}
                    <Link style = {{textDecoration: 'none'}} to={`/${PATH.SIGNUP}`}><a className="nav-link" href="#">SignUp</a></Link>
                  </p>
                </div>
                {/* //end of login form */}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      userType: state.user.userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setLoginState: (token, userType) => dispatch(setLoginState(token, userType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
