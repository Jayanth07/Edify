import React, { Component } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'

export default class SearchTutors extends Component {

    render() {

    return (
		<div>
			<Header />
			{/* <!-- Full Page Image Header with Vertically Centered Content --> */}
			<header class="masthead">
				<div class="container h-100">
				<div class="row h-100 align-items-center">
				<div class="col-12 text-center">
					<div style={{ backgroundColor: 'white', width: '100%', height: 300 }}>
						<Outlet/>
					<br/>
            {/* <br/>
            <h1>This is the tutors page... </h1>
            <br/>
            <h1>Where you'll find tutors better than the ones in your schools or Universities!</h1> */}
					</div>
					<h1 class="fw-light">Search for tutors</h1>
				</div>
				</div>
				</div>
			</header>
			
			

			<Footer />

		</div>
    )
  }
}
