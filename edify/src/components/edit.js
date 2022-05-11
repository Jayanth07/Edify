import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";

const Edit = () => {
  console.log("user:");
  //   console.log("user:", this.props.user);
  //   console.log("name", props.user.firstname);
  const firstname = "Deepika";
  const lastname = "Mamidipelly";
  const email = "dxm@utdallas.edu";
  const user = "tutor";
  const [mobile, setMobile] = useState("2148921475");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [bio, setBio] = useState("Hello....");
  const [courses, setCourses] = useState("wpl,db design");

  const form = { mobile, password, bio, courses, confirmPassword };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
  };

  return (
    <>
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center mt-5">
          <div class="p-sm-5">
            <div class="row d-flex justify-content-center order-2 pd-3">
              <div class=" login col-sm-5">
                <h3>User Details</h3>

                <div className="col-md-6">
                  <div className="form-group">
                    <i class="bi bi-person-fill me-3 icon"></i>
                    <label>
                      First Name:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      value={firstname}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <i class="bi bi-envelope-fill me-3 icon"></i>
                    <label>
                      Email:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <i class="bi bi-key-fill me-3 icon"></i>
                    <label>
                      Change Password:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={password}
                      //   onChange={this.handleChange}
                      //   onBlur={this.handleChange}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* {formErrors.password && (
                      <span className="err">{formErrors.password}</span>
                    )} */}
                  </div>
                  <div className="form-group">
                    <label>Bio:</label>
                    <textarea
                      className="form-control"
                      type="text"
                      name="textarea"
                      value={bio}
                      //   onChange={this.handleChange}
                      //   onBlur={this.handleChange}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    {/* {formErrors.textarea && (
                        <span className="err">{formErrors.textarea}</span>
                      )} */}
                  </div>

                  {/* //image code */}
                  {/* <div aria-hidden={props.user.user !== "tutor" ? true : false}>
                    <div className="form-group">
                      <p className="title">Upload Image:</p>
                      <div style={{ marginBottom: 10 }}>
                        <input
                          type="file"
                          name="selectedFile"
                          value={props.user.selectedFile}
                          onChange={this.uploadImage}
                        />
                      </div>
                      {this.invalidImage && (
                        <p className="error">{this.invalidImage}</p>
                      )}
                    </div>
                  </div> */}

                  {/* submit */}
                  <div className="form-group ">
                    <input
                      type="button"
                      className="btn submit"
                      value="Submit"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>

                {/* second column */}
                <div className="col-md-6">
                  {/* Last Name */}
                  <div className="form-group">
                    <i class="bi bi-person-fill me-3 icon"></i>
                    <label>
                      Last Name:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastname"
                      value={lastname}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <i class="bi bi-telephone-fill me-3 icon"></i>
                    <label>
                      Mobile:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      //   onChange={this.handleChange}
                      //   onBlur={this.handleChange}
                    />
                    {/* {formErrors.mobile && (
                      <span className="err">{formErrors.mobile}</span>
                    )} */}
                  </div>

                  {/* confirm password */}
                  <div className="form-group">
                    <i class="bi bi-key-fill me-3 icon"></i>
                    <label>
                      Confirm Password:<span className="asterisk">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      //   onChange={this.handleChange}
                      //   onBlur={this.handleChange}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {/* {formErrors.confirmPassword && (
                      <span className="err">{formErrors.confirmPassword}</span>
                    )} */}
                  </div>

                  {/* //end of columns */}
                  {/* 
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
                          checked={props.user.user === "student"}
                          onChange={this.handleChange}
                        />{" "}
                        Student
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="user"
                          value="tutor"
                          checked={props.user.user === "tutor"}
                          onChange={this.handleChange}
                        />{" "}
                        Tutor
                      </label>
                    </div>
                </div> */}

                  <div aria-hidden={user !== "tutor" ? true : false}>
                    <div className="form-group">
                      <label>
                        Courses:<span className="asterisk">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="courses"
                        value={courses}
                        onChange={(e) => setCourses(e.target.value)}
                        // onChange={this.handleChange}
                        // onBlur={this.handleChange}
                      />
                      {/* {formErrors.courses && (
                        <span className="err">{formErrors.courses}</span>
                      )} */}
                    </div>
                  </div>
                  {/* //end of login form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
