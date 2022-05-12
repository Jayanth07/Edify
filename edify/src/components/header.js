import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PATH } from "./../constants/appConstants";
import { connect } from "react-redux";

class Header extends Component {
	state = {
		token: sessionStorage.getItem("token"),
		userType: sessionStorage.getItem("userType"),
	};

	render() {
		const noUnderline = {
			textDecoration: "none",
		};

		return (
			<div
				style={{
					marginBottom: "75px",
					marginLeft: "auto",
					marginRight: "auto",
				}}
			>
				<nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
					<div class="container">
						<Link to={PATH.HOME}>
							<a className="navbar-brand" href="#">
								<img id="logo" src="./../../logo_name.png" />
							</a>
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarResponsive"
							aria-controls="navbarResponsive"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarResponsive">
							<div class="d-flex justify-contents-start text-left">
								<ul class="navbar-nav ms-auto d-flex align-items-center">
									<li class="nav-item active d-flex">
										<Link style={noUnderline} to={PATH.HOME}>
											<a className="nav-link" href="#">
												Home
											</a>
										</Link>
									</li>
									{this.state.userType !== "tutor" && (
										<li class="nav-item">
											<Link style={noUnderline} to={`/${PATH.TUTORS}`}>
												<a className="nav-link" href="#">
													Tutors
												</a>
											</Link>
										</li>
									)}

									{this.state.userType !== "tutor" &&
										sessionStorage.getItem("token") && (
											<li class="nav-item">
												<Link style={noUnderline} to={`/${PATH.FAVORITES}`}>
													<a className="nav-link" href="#">
														Favorites
													</a>
												</Link>
											</li>
										)}

									<li class="nav-item">
										<Link style={noUnderline} to={`/${PATH.APPOINTMENTS}`}>
											<a className="nav-link" href="#">
												Meetings
											</a>
										</Link>
									</li>
									<li class="nav-item">
										<a className="nav-link" href="#">
											About
										</a>
									</li>
									<li>
										<form class="d-flex align-items-center">
											<input
												class="form-control input-sm"
												type="search"
												placeholder="Search"
												aria-label="Search"
											/>
											<button type="button" class="btn btn-sm m-1">
												<i class="bi bi-search"></i>
											</button>
										</form>
									</li>
								</ul>
							</div>
							{sessionStorage.getItem("token") ? (
								<ul class="navbar-nav ms-auto d-flex align-items-center">
									{sessionStorage.getItem("userType") == "tutor" && (
										<li class="nav-item">
											<Link
												style={{ textDecoration: "none" }}
												to={`/${PATH.EDIT}`}
											>
												<button
													type="button"
													class="btn btn-outline-primary btn-sm m-1"
												>
													Edit Profile
												</button>
											</Link>
										</li>
									)}
									<li class="nav-item">
										<Link
											style={{ textDecoration: "none" }}
											to={`
                        ${PATH.HOME}`}
										>
											<button
												type="button"
												class="btn btn-warning btn-sm m-1"
												onClick={() => {
													sessionStorage.clear();
													window.location.href = "http://localhost:3001/login";
												}}
											>
												Sign out
											</button>
										</Link>
									</li>
								</ul>
							) : (
								<ul class="navbar-nav ms-auto d-flex align-items-center">
									<li class="nav-item">
										<Link
											style={{ textDecoration: "none" }}
											to={`/${PATH.LOGIN}`}
										>
											<button
												type="button"
												class="btn btn-outline-primary btn-sm m-1"
											>
												Log in
											</button>
										</Link>
									</li>
									<li class="nav-item">
										<Link
											style={{ textDecoration: "none" }}
											to={`/${PATH.SIGNUP}`}
										>
											<button type="button" class="btn btn-warning btn-sm m-1">
												Signup
											</button>
										</Link>
									</li>
								</ul>
							)}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
