import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header'
import Footer from '../components/footer'


const AppointmentDetails = (props) => {

	let [appointmentDetails, setAppointmentDetails] = useState([]);
    let { appId } = useParams();
	
useEffect(() => {
	fetch('http://localhost:3000/appointments/' + appId, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
		})
		.then(res => res.json())
		.then((data) => {
			setAppointmentDetails(data)
		})
		.catch(console.log)
}, []);


    return (
        <div style={{ margin: '75px 0px 25px 0px' }}>
            <Header />
        
        <div className="container p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: '15px'}}> 
        
        { appointmentDetails && appointmentDetails.map((appointment, id) => {

            const startDate = new Date(appointment.start_date_time);
            const endDate = new Date(appointment.end_date_time);
            
            return (
            <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="project-info-box mt-0">
                        <h3 style={{color: '#feb000'}}>Appointment Details</h3>
                        <br/>
                        <p className="mb-0">{appointment.notes}</p><br/>
                    </div>
                    {/* <!-- / project-info-box --> */}
        
                    <div className="project-info-box">
                        <p><div class="row">
                            <div class="col-3"><b>Status: </b></div>
                            <div class="col-6 status"><span className={appointment.status == 'SCHEDULED' ? 'active' : 'waiting'}>{appointment.status}</span></div>
                        </div></p>
                        <p><b>Tutor:</b> {appointment.tutorName}</p>
                        <p><b>Student:</b> {appointment.studentName}</p>
                        <p><b>Date:</b> {startDate.toDateString()}</p>
                        <p><b>Time:</b> {`${startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - ${endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}</p>
                        <p className="mb-0"><b>Course:</b> {appointment.course}</p>
                    </div>
                    {/* <!-- / project-info-box --> */}
                </div>
                {/* <!-- / column --> */}
        
                <div className="col-md-7 pb-10">
                    <img src="../appointment.png" width={400} height={375} alt="project-image" className="rounded" />
                </div>
            </div>
        </div>           
        )})}
        </div>
        <Footer />
      </div>
    )
  }
export default AppointmentDetails;


