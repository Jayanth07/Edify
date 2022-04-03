import React, { Component } from 'react'

export default class HomePage extends Component {

    render() {

    return (
		<div>
		{/* <!-- Navigation --> */}
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
<div class="container">
<a className="navbar-brand" href="#"><img id="logo" src="./../logo_name.png" /></a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarResponsive">
	<div class="d-flex justify-contents-start text-left">
		<ul class="navbar-nav ms-auto d-flex align-items-center">
			<li class="nav-item active d-flex">
			<a class="nav-link" href="#">Home</a>
			</li>
			<li class="nav-item">
			<a class="nav-link" href="#">About</a>
			</li>
			<li>
				<form class="d-flex align-items-center">
					<input class="form-control input-sm" type="search" placeholder="Search" aria-label="Search" />
					<button type="button" class="btn btn-sm m-1"><i class="bi bi-search"></i></button>
				</form>
			</li>
		</ul>
	</div>
	<ul class="navbar-nav ms-auto d-flex align-items-center">
		<li class="nav-item">
			<button type="button" class="btn btn-outline-primary btn-sm m-1">Log in</button>
		</li>
		<li class="nav-item">
			<button type="button" class="btn btn-warning btn-sm m-1">Signup</button>
		</li>
	</ul>
</div>
</div>
</nav>

{/* <!-- Full Page Image Header with Vertically Centered Content --> */}
<header class="masthead">
<div class="container h-100">
<div class="row h-100 align-items-center">
  <div class="col-12 text-center">
	<h1 class="fw-light">Learn yourselves a better tomorrow</h1>
	<p class="lead">Teach and Learn</p>
  </div>
</div>
</div>

{/* <!--<div class="container">
<div class="row">
	<div class="col">
		<div class="weather-card one">
			<div class="top">
				<div class="wrapper">
					<div class="mynav">
						<a href="javascript:;"><span class="lnr lnr-chevron-left"></span></a>
						<a href="javascript:;"><span class="lnr lnr-cog"></span></a>
					</div>
					<h1 class="heading">Clear night</h1>
					<h3 class="location">Dhaka, Bangladesh</h3>
					<p class="temp">
						<span class="temp-value">20</span>
						<span class="deg">0</span>
						<a href="javascript:;"><span class="temp-type">C</span></a>
					</p>
				</div>
			</div>
			<div class="bottom">
				<div class="wrapper">
					<ul class="forecast">
						<a href="javascript:;"><span class="lnr lnr-chevron-up go-up"></span></a>
						<li class="active">
							<span class="date">Yesterday</span>
							<span class="lnr lnr-sun condition">
								<span class="temp">23<span class="deg">0</span><span class="temp-type">C</span></span>
							</span>
						</li>
						<li>
							<span class="date">Tomorrow</span>
							<span class="lnr lnr-cloud condition">
								<span class="temp">21<span class="deg">0</span><span class="temp-type">C</span></span>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="col">
		<div class="weather-card rain">
			<div class="top">
				<div class="wrapper">
					<div class="mynav">
						<a href="javascript:;"><span class="lnr lnr-chevron-left"></span></a>
						<a href="javascript:;"><span class="lnr lnr-cog"></span></a>
					</div>
					<h1 class="heading">Rainy day</h1>
					<h3 class="location">Sylhet, Bangladesh</h3>
					<p class="temp">
						<span class="temp-value">16</span>
						<span class="deg">0</span>
						<a href="javascript:;"><span class="temp-type">C</span></a>
					</p>
				</div>
			</div>
			<div class="bottom">
				<div class="wrapper">
					<ul class="forecast">
						<a href="javascript:;"><span class="lnr lnr-chevron-up go-up"></span></a>
						<li class="active">
							<span class="date">Yesterday</span>
							<span class="lnr lnr-sun condition">
								<span class="temp">22<span class="deg">0</span><span class="temp-type">C</span></span>
							</span>
						</li>
						<li>
							<span class="date">Tomorrow</span>
							<span class="lnr lnr-cloud condition">
								<span class="temp">18<span class="deg">0</span><span class="temp-type">C</span></span>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
</div>--> */}
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
<footer class="deneb_footer">
<div class="widget_wrapper" style={{ backgroundImage: `url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)` }}>

	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6 col-12">
				<div class="widget widegt_about">
					<p>
						A platform for students to learn from any course from a suitable professor of their choice, while parallely allowing professors to share their knowledge on course to enlighten the students and gain income!</p>
					<ul class="social">
						<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
						<li><a href="#"><i class="fab fa-twitter"></i></a></li>
						<li><a href="#"><i class="fab fa-instagram"></i></a></li>
						<li><a href="#"><i class="fab fa-youtube"></i></a></li>
						<li><a href="#"><i class="fab fa-linkedin"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-4 col-md-6 col-sm-12">
				<div class="widget widget_link">
					<div class="widget_title">
						<h4>Links</h4>
					</div>
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Services</a></li>
						<li><a href="#">Reviews</a></li>
						<li><a href="#">Blog</a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-4 col-md-6 col-sm-12">
				<div class="widget widget_contact">
					<div class="widget_title">
						<h4>Contact Us</h4>
					</div>
					<div class="contact_info">
						<div class="single_info">
							<div class="icon">
								<i class="fas fa-phone-alt"></i>
							</div>
							<div class="info">
								<p><a href="tel:1800-121-3637">1800-121-3637</a></p>
								<p><a href="tel:+19246147999">+1 924-614-7999</a></p>
							</div>
						</div>
						<div class="single_info">
							<div class="icon">
								<i class="fas fa-envelope"></i>
							</div>
							<div class="info">
								<p><a href="mailto:info@edify.com">info@edify.com</a></p>
								<p><a href="mailto:services@edify.com">contact@edify.com</a></p>
							</div>
						</div>
						<div class="single_info">
							<div class="icon">
								<i class="fas fa-map-marker-alt"></i>
							</div>
							<div class="info">
								<p>800W, Richardson,<span>Texas.</span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</footer>

	</div>
    )
  }
}
