import React, { Component } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'
import { setTutors } from '../redux/actions'

export default class SearchTutors extends Component {



    render() {

    return (
		<div>
			{/* <Header /> */}
			{/* <header class="masthead">
				<div class="container h-100">
				<div class="row h-100 align-items-center">
				<div class="col-12 text-center">
					<div style={{ backgroundColor: 'white', width: '100%', height: 300 }}>
						<Outlet/>
					<br/>
					</div>
					<h1 class="fw-light">Search for tutors</h1>
				</div>
				</div>
				</div>
			</header>
			
			

			<Footer /> */}
			<Outlet />

		</div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        setTutors: id => dispatch(setTutors(id))
    }
}
