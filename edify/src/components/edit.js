import React, { Component } from "react";
import { useState, useEffect } from "react";
import Header from '../components/header'
import Footer from '../components/footer'

const Edit = () => {
  console.log("user:");
  //   console.log("user:", this.props.user);
  //   console.log("name", props.user.firstname);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const user = "tutor";
  const [mobile, setMobile] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState("");
  let tutorId = '';

  const token = sessionStorage.getItem('token');
  const form = { mobile, bio, courses };
  const handleSubmit = () => {

    fetch(`http://localhost:3000/tutors/${tutorId}` , {
        method: 'PUT',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: {
            token: token,
            email: email,
            bio: bio,
            courses: courses,
            phone_number: mobile,
            first_name: firstname,
            last_name: lastname
        }
        })
        .then( res => res.json() )
        .then( (tutor) => {
          console.log('Okk')
          console.log(tutor)
        })
        .catch(console.log)


  };

  useEffect(() => {

    if (sessionStorage.getItem('userType') == 'tutor') {
      fetch(`http://localhost:3000/tutors/details?token=${token}` , {
        method: 'post',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
        })
        .then( res => res.json() )
        .then( (tutor) => {
          console.log(tutor)
          setEmail(tutor.email)
          setFirstName(tutor.first_name)
          setLastName(tutor.last_name)
          setMobile(tutor.phone_number)
          setBio(tutor.bio)
          setCourses(tutor.courses.join(', '))
        })
        .catch(console.log)
    }
  }, []);

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
                <h3>User Details</h3>

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
                      value={firstname}
                      disabled
                    />
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
                      value={email}
                      disabled
                    />
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
                  <button
                      type="button"
                      className="btn btn-warning btn-sm m-1 submit"
                      onClick={handleSubmit}
                    >Confirm</button>
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
                      value={lastname}
                      disabled
                    />
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
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
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
      <Footer />
    </div>
  );
};

export default Edit;
