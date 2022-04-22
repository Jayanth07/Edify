import React, { Component, useEffect, useState } from 'react';


const Appointments = (props) => {

	let [appointmentDetails, setAppointmentDetails] = useState([]);
	
useEffect(() => {
	fetch('appointments.json', {
		headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
		})
		.then( res => res.json() )
		.then( (data) => {
			setAppointmentDetails(data)
			console.log(data)
		})
		.catch(console.log)
}, []);


    return (
        <div class="container">
            <h1 class="appt_nme"><i className="bi bi-calendar"></i> &nbsp;My Appointments</h1>
            <div class="border border_appt rounded">
			<div class="card-deck mt-3  border-3">
				 {appointmentDetails && appointmentDetails.map( (appointment, id) => (
				 <div class="col-sm-6 col-lg-4 mb-3" key={id}>
					<div class="card card_appt mb-3 h-100">
						<div class="card-body">
							<h5 class="card-title card-title_appt">
								<i class="bi bi-clock iconAppoint"></i> &nbsp;
							{appointment.start_date_time.slice(0,8)}-&nbsp;{appointment.end_date_time.slice(0,8)}</h5>
							<p class="card-text card-text_appt"><i class="bi bi-calendar-event-fill iconAppoint"></i> &nbsp; {appointment.end_date_time.slice(8,18)}</p>
                            <p class="card-text card-text_appt"><i class="bi bi-person-fill iconAppoint"></i>
							&nbsp;Meeting with {appointment.student_name}</p>
							<p class="card-text card-text_appt course"><bold>Course:</bold> {appointment.course}</p>
						</div>
					</div>
				</div>
				))}
				</div>
			</div>
		</div>
    )
  }
export default Appointments;