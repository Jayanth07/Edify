import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { selectTutor } from '../redux/actions'
import Header from '../components/header'
import Footer from '../components/footer'

class TutorDetails extends Component {

    render() {
        console.log('totling')
        console.log(this.props)
    return (
        // <div>
            // <Header />
        //     <Link to="/tutors">
        //     <div id='back' onClick={() => this.props.selectTutor(undefined)}>Go back</div>
        //     </Link>
        //     <h1>{this.props.tutorsId} is the selected tutor's id</h1>
            // <Footer />
        // </div>
<div>
            <Header />
            <div className="container p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)'}}> 

        { this.props.tutorDetails.map( (tutor, id) => (
           <div className="row" key={id}> 
           <div className="tutor-info-name"> {tutor.first_name}  {tutor.last_name} </div> 
           <div className="col-sm-4">
              <img className="img-fluid tutor-info-img" src={tutor.path} alt="error" width="312" height="638"/>  
               <div className="tutor-info-details">
                 <div className="tutor-info-details-text">
                              <div className="icon">
								        	 <i className="bi bi-star-fill"></i>
								        </div>
                        <div className="info">
                          {tutor.rating} Tutor rating
                          </div>
                          </div>

                      <div className="tutor-info-details-text">
                              <div className="icon">
								        	 <i className="bi bi-play-circle-fill"></i>
								        </div>
                        <div className="info">
                          {tutor.courses.length} courses
                          </div>
                          </div>
                    <div className="tutor-info-details-text">
                      <div className="icon">
								        <i className="fas fa-phone-alt"></i>
								        </div>
                        <div className="info">
                          <a href={`tel:${tutor.phone_code}${tutor.phone_number}`}>{tutor.phone_code} {tutor.phone_number}</a>
                          
                          </div>
                    </div>
                    <div className="tutor-info-details-text"> 
                        <div className="icon">
								        	<i className="fas fa-envelope"></i>
								        </div>
                        <div className="info">
                         <a href="">{tutor.email}</a> 
                          </div>
                    </div>
                    
                     <div className="tutor-info-details-text">
                              <div className="icon">
								        	<i className="fas fa-map-marker-alt"></i>
								        </div>
                        <div className="info">
                          {tutor.location}
                          </div>
                          </div>       
             </div>  
             </div>
            
             <div className="col-sm-7">
               <h3><i className="tutor-bio">{tutor.bio}</i></h3>
               <div className="courses">Courses
                 <div className="course-details">{tutor.courses.map( (course,id) => (<div key={id} className="course-details-text">{course}</div>))}</div>
               </div>
               <h4 >About me</h4>
               <div>{tutor.about_me}
               </div>

               <div className="education">
                  <h5 className="tutor-certifications">Certifications</h5>
                     <div className="tutor-certi-details">
                        {tutor.certificates.map( (d,id) => (<div key={id}>{d}</div>))} 
                    </div>
                 </div>

              {/* <div className="student-feedback">
                 <h3 className="student-feeback-name">Student feedback</h3>

                 <div className="total-stars-container">
                     <div className="rating-value"> 4.5
                       </div>
                       <div className='rating-stars'>
                         <span className="fa fa-star checked"></span>
                         <span className="fa fa-star checked"></span>
                         <span className="fa fa-star checked"></span>
                         <span className="fa fa-star checked"></span>
                         <span className="fa fa-star checked"></span>
                         </div>
                 </div>
               </div>   */}
                </div>
        </div>
        ))}
        </div>

<Footer />

      </div>
    )
  }

}

const mapStateToProps = state => {
    return {
        tutorsId: state.tutors.id,
        tutorDetails: state.tutors.tutors.filter(t => t.id === state.tutors.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTutor: id => dispatch(selectTutor(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetails);
