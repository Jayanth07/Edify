import React, { Component } from 'react'
import { Outlet, Link } from "react-router-dom" // Check '<Outlet>'
import Header from '../components/header'
import Footer from '../components/footer'
import { connect } from 'react-redux'

export default class HomePage extends Component {

    render() {

    return (
		<div>
			<Header />

			{/* <!-- Full Page Image Header with Vertically Centered Content --> */}
			<header class="masthead">
				<div class="container h-100">
				<div class="row h-100 align-items-center">
				<div class="col-12 text-center">
					<h1 class="fw-light">Learn yourselves a better tomorrow</h1>
					<p class="lead">Teach and Learn</p>
					<div class="button_box">
						<Link to="/tutors"><a href="#" class="btn btn-lg btn-warning"><i class="bi bi-search" /> Search Tutors</a></Link>
					</div>
				</div>
				</div>
				</div>
			</header>
			
			<section class="deneb_cta">
			<div class="container">
				<div class="cta_wrapper">
					<div class="row align-items-center">
						<div class="col-lg-7">
							<div class="cta_content">
								<h3>Want to teach?</h3>
								<p>Do you wanna spread the knowledge and earn while doing it?</p>
							</div>
						</div>
						<div class="col-lg-5">
							<div class="button_box">
								<a href="#" class="btn btn-lg btn-warning">Apply</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			</section>

			<Footer />

		</div>
    )
  }
}
