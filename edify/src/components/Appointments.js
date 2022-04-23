import React, { useEffect, useState } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import { Link } from "react-router-dom"

const Appointments = (props) => {

	let [appointments, setAppointments] = useState([]);
	
useEffect(() => {
	fetch('http://localhost:3000/appointments', {
		headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
		})
		.then( res => res.json() )
		.then( (data) => {
			setAppointments(data)
			console.log(data)
		})
		.catch(console.log)
}, []);


    return (
		<div>
		<div>
			<Header />
        </div>
        <div class="container">
			
            <div class="border border_appt rounded">
			<div class="card-deck mt-3  border-3">
			<div class='col'>
	            <h1 class="appt_nme"><i className="bi bi-calendar"></i> &nbsp;My Appointments</h1>
			</div>
				 {appointments && appointments.map( (appointment, id) => (
					 <Link style={{color: 'black'}} to={appointment._id}>
						<div class="col-sm-6 col-lg-4 mb-3" key={id}>
							<div class="card card_appt mb-3 h-110">
								<div class="card-body">
									<h5 class="card-title card-title_appt"><i class="bi bi-clock iconAppoint"></i>
									{appointment.start_date_time.slice(0,7)}-{appointment.end_date_time.slice(0,8)}</h5>
									<p class="card-text"><i class="bi bi-calendar-event-fill iconAppoint"></i>{appointment.end_date_time.slice(8,18)}</p>
									<p class="card-text "><i class="bi bi-person-fill iconAppoint"></i>Meeting with {appointment.tutorName}</p>
									<p class="card-text course"><b>Course:</b> {appointment.course}</p>
								</div>
							</div>
						</div>
					</Link>
				))}
				</div>
			</div>
		</div>
		<div className='container-float'>
	        <Footer />
		</div>
		</div>
    )
  }
export default Appointments;