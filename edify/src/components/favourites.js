import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTutor } from "../redux/actions";
import { Link } from "react-router-dom";
import { PATH } from "./../constants/appConstants";
import { setTutors } from "../redux/actions";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

class Favourites extends Component {
	state = {
		displayTutors: this.props.tutors,
		favouriteTutors: [],
	};

	componentDidMount() {
		if (
			this.props.tutors === undefined ||
			this.state.displayTutors === undefined
		) {
			fetch("http://localhost:3000/tutors", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
				.then((res) => res.json())
				.then((tutorsdata) => {
					console.log("data", tutorsdata);
					fetch("http://localhost:3000/students/627c4613606c1e37e00ff8a7", {})
						.then((res) => res.json())
						.then((data) => {
							this.setState({ favouriteTutors: data[0].favourite_tutors });
							this.props.setTutors(tutorsdata);
							// const newList = tutorsdata.filter((e) =>
							// 	this.state.favouriteTutors.includes(tutorsdata._id)
							// );
							let newFavourites = tutorsdata.filter((tutor) =>
								this.state.favouriteTutors.some((fav) => tutor._id === fav)
							);
							console.log("newList", newFavourites);
							this.setState({ displayTutors: newFavourites });
						})
						.catch(console.log);
				})
				.catch(console.log);
		}
	}

	openDetails = (id) => {
		this.props.selectTutor(id);
	};

	removeFavourites = (id) => {
		console.log("id", id);
		const base_url = "http://localhost:3000/students/removefavourites";
		const data = { student_id: "627c4613606c1e37e00ff8a7", tutor_id: id };
		axios
			.put(base_url, data)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log("error", error.response);
			});
		window.location.reload(false);
		console.log(JSON.stringify(data));
	};

	render() {
		console.log("display list");
		console.log(this.state);
		return (
			<div>
				<Header />
				{this.state.displayTutors &&
					this.state.displayTutors.map((tutor, id) => (
						<div
							class="row d-flex justify-content-center card-lay m-4"
							key={id}
						>
							<div class="col-md-7">
								<div class="card p-3 py-4">
									<div class="text-center">
										{" "}
										<img
											src={`../${tutor.path}`}
											width="100"
											class="rounded profile-picture"
										/>
										<br />
										<b>Rating: </b>
										{tutor.rating}{" "}
										<i style={{ color: "#ffb70b" }} class="bi bi-star-fill"></i>
										<br /> <b>Total Tutoring Hours: </b>{" "}
										{tutor.totalTutoringHours}
									</div>
									<div class="text-center mt-3">
										{" "}
										<span class="bg-secondary p-1 rounded text-white">
											1000+ Chats
										</span>
										&nbsp;
										<span class="bg-secondary p-1 rounded text-white">
											Certified
										</span>
										<h5 class="mt-2 mb-0">
											<div className="tutor-info-name">
												{" "}
												{tutor.first_name} {tutor.last_name}{" "}
											</div>{" "}
										</h5>
										<div class="px-4 mt-1">
											<p class="fonts" style={{ fontSize: "20px" }}>
												<i className="tutor-bio">{tutor.bio}</i>
											</p>
											<p class="fonts" style={{ fontSize: "16px" }}>
												<i className="tutor-bio">
													<b>Courses: </b>
													{tutor.courses}
												</i>
											</p>
										</div>
										<div class="buttons">
											<button
												class="btn btn-outline-primary px-4"
												onClick={() => this.removeFavourites(tutor._id)}
											>
												<i class="bi bi-heart"></i> Remove from Favorites
											</button>
											<Link to={`${tutor._id}`}>
												<button
													class="btn btn-warning px-4 ms-3 text-white"
													onClick={() => this.openDetails(tutor._id)}
												>
													Profile
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}

				{/* <div >
        <div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-7">
            <div class="card p-3 py-4">
                <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/> </div>
                <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 class="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                    <div class="px-4 mt-1">
                        <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-7">
            <div class="card p-3 py-4">
                <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/> </div>
                <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 class="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                    <div class="px-4 mt-1">
                        <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div> */}

				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tutors: state.tutors.tutors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectTutor: (id) => dispatch(selectTutor(id)),
		setTutors: (tutors) => dispatch(setTutors(tutors)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
