import React, { Component } from "react";

class UserDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div style={{ margin: "75px 0px 25px 0px" }}>
        <div
          className="container p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "15px",
          }}
        >
          <div class="row d-flex justify-content-center order-2 pd-3">
            <div class=" login col-sm-5">
              <h3
                className="tutor-info-name"
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                User Details{" "}
              </h3>
              <br />
              {this.props.tutorDetails.map((user, id) => (
                <div className="row" key={id}>
                  {/* <div className="tutor-info-name">
                    {" "}
                    {user.first_name} {user.last_name}{" "}
                  </div> */}
                  <div className="col-sm-7">
                    {user.user === "tutor" && (
                      <img
                        className="img-fluid tutor-info-img"
                        src={user.path}
                        alt="error"
                        width="312"
                        height="638"
                      />
                    )}
                    <div className="tutor-info-details">
                      {/* <div className="tutor-info-details-text">
                        <div className="icon">
								        	 <i className="bi bi-star-fill"></i>
								        </div>
                        <div className="info">
                          {tutor.rating} Tutor rating
                        </div>
                      </div> */}

                      <div className="user-info-name">
                        {" "}
                        <span className="user-info-name-txt">
                          FirstName :
                        </span>{" "}
                        {user.first_name}
                      </div>

                      <div className="user-info-name">
                        {" "}
                        <span className="user-info-name-txt">
                          LastName :{" "}
                        </span>{" "}
                        {user.last_name}
                      </div>

                      {user.user === "tutor" && (
                        <div className="tutor-info-details-text">
                          <div className="icon">
                            <i className="bi bi-play-circle-fill"></i>
                          </div>
                          <div className="info">
                            {user.courses.length} courses
                          </div>
                        </div>
                      )}
                      <div className="tutor-info-details-text">
                        <div className="icon">
                          <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="info">
                          {user.phone_code} {user.phone_number}
                        </div>
                      </div>
                      <div className="tutor-info-details-text">
                        <div className="icon">
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div className="info">{user.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-5">
                    <div className="courses">About</div>
                    <h3>
                      <i className="tutor-bio">{user.bio}</i>
                    </h3>
                    {user.user === "tutor" && (
                      <div className="courses">
                        Courses
                        <div className="course-details">
                          {user.courses.map((course, id) => (
                            <div key={id} className="course-details-text">
                              {course}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="form-group " style={{ alignItems: "center" }}>
                <input type="button" className="btn submit" value="Edit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
