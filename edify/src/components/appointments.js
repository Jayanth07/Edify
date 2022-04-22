import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import { Link } from "react-router-dom"
import { PATH } from './../constants/appConstants'
import { setTutors } from '../redux/actions'

import Header from '../components/header'
import Footer from '../components/footer'

class Appointments extends Component {

    state = {
        displayTutors: this.props.tutors
    }

    componentDidMount(){
        // if (this.props.tutors === undefined || this.state.displayTutors === undefined) {
        //     fetch('http://localhost:3000/appointments', {
        //         headers : { 
        //           'Content-Type': 'application/json',
        //           'Accept': 'application/json'
        //         }
        //       })
        //       .then(res => res.json())
        //       .then((data) => {
        //           this.props.setTutors(data)
        //           this.setState({ displayTutors: data })
        //           console.log(data)
        //       })
        //       .catch(console.log)
        // }
    }

    openDetails = (id) => {
        console.log(`This is the id: ${id}`);
        this.props.selectTutor(id);
    }

    render() {
        console.log('display list')
        console.log(this.state)
    return (
    <div >
        <div class='mb-10'>
            <Header />
        </div>
        <div>
        <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">My Appointments</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-md">
					<div class="table-wrap">
						<table class="table table-responsive-xl">
						  <thead>
						    <tr>
                              <th>Date</th>
                              <th>Time</th>
						      <th>With</th>
						      <th>Status</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr class="alert" role="alert">
						      <td class="d-flex align-items-center">
						      	<div class="pl-3 email">
						      		<span>markotto@email.com</span>
						      		<span>Added: 01/03/2020</span>
						      	</div>
						      </td>
						      <td>Markotto89</td>
						      <td class="status"><span class="active">Active</span></td>
						      <td>
						      	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				            	<span aria-hidden="true"><i class="fa fa-close"></i></span>
				          	</button>
				        	</td>
						    </tr>
						    <tr class="alert" role="alert">
						      <td class="d-flex align-items-center">
						      	<div class="pl-3 email">
						      		<span>jacobthornton@email.com</span>
						      		<span>Added: 01/03/2020</span>
						      	</div>
						      </td>
						      <td>Jacobthornton</td>
						      <td class="status"><span class="waiting">Waiting for Resassignment</span></td>
						      <td>
						      	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				            	<span aria-hidden="true"><i class="fa fa-close"></i></span>
				          	</button>
				        	</td>
						    </tr>
						    <tr class="alert" role="alert">
						      <td class="d-flex align-items-center">
						      	<div class="pl-3 email">
						      		<span>larrybird@email.com</span>
						      		<span>Added: 01/03/2020</span>
						      	</div>
						      </td>
						      <td>Larry_bird</td>
						      <td class="status"><span class="active">Active</span></td>
						      <td>
						      	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				            	<span aria-hidden="true"><i class="fa fa-close"></i></span>
				          	</button>
				        	</td>
						    </tr>
						    <tr class="alert" role="alert">
						      <td class="d-flex align-items-center">
						      	<div class="pl-3 email">
						      		<span>johndoe@email.com</span>
						      		<span>Added: 01/03/2020</span>
						      	</div>
						      </td>
						      <td>Johndoe1990</td>
						      <td class="status"><span class="active">Active</span></td>
						      <td>
						      	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				            	<span aria-hidden="true"><i class="fa fa-close"></i></span>
				          	</button>
				        	</td>
						    </tr>
						    <tr class="alert" role="alert">
						      <td class="d-flex align-items-center border-bottom-0">
						      	<div class="pl-3 email">
						      		<span>garybird@email.com</span>
						      		<span>Added: 01/03/2020</span>
						      	</div>
						      </td>
						      <td class="border-bottom-0">Garybird_2020</td>
						      <td class="status border-bottom-0"><span class="waiting">Waiting for Resassignment</span></td>
						      <td class="border-bottom-0">
						      	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				            	<span aria-hidden="true"><i class="fa fa-close"></i></span>
				          	</button>
				        	</td>
						    </tr>
						  </tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
        </div>
   
        <Footer />
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        tutors: state.tutors.tutors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTutor: id => dispatch(selectTutor(id)),
        setTutors: tutors => dispatch(setTutors(tutors))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appointments)