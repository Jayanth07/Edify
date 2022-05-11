import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import Header from '../components/header'
import Footer from '../components/footer'

class TutorDetails extends Component {

  
  state = {
      token: sessionStorage.getItem('token'),
      userType: sessionStorage.getItem('userType')
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

    render() {
    return (
    <div style={{ margin: '75px 0px 25px 0px' }}>
            <Header />
            <div className="container p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: '15px'}}> 
        { this.props.tutorDetails.map( (tutor, id) => (
           <div className="row" key={id}> 
           <div className="tutor-info-name"> {tutor.first_name}  {tutor.last_name} </div> 
           <div className="col-sm-4">
              <img className="img-fluid tutor-info-img" src={`../${tutor.path}`} alt="error" width="312" height="638"/>  
               <div className="tutor-info-details">
                 {/* <div className="tutor-info-details-text">
                        <div className="icon">
								        	 <i className="bi bi-star-fill"></i>
								        </div>
                        <div className="info">
                          {tutor.rating} Tutor rating
                        </div>
                      </div> */}

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
               <div className="courses">About me
                 <div className="course-details" style={{color: 'black'}}>{tutor.bio}</div>
               </div>
               
               <div className="courses">Total Tutoring Hours
                 <div className="course-details" style={{color: 'black'}}>{tutor.totalTutoringHours}</div>
               </div>

               <div className="education">
                  <h5 className="tutor-certifications">Certifications</h5>
                     <div className="tutor-certi-details">
                        {tutor.certificates.map((d,id) => (<div key={id}>{d}</div>))} 
                    </div>
                </div>
                
              <br/>

              {this.state.userType !== 'tutor' && <div>
              <h3 className="courses">Appointments</h3>

              <div class="rating-block">
                <div class="row">

                  <div class="col-sm">
                      <h4>Start date:</h4>
                      <input className='rounded' type="date" id="start" name="trip-start" value="2022-05-12"></input>
                  </div>
                  
                  <div class="col-sm">
                    <h4>Time Slot: </h4>
                    <select class="form-select" aria-label="Default select example">
                      <option value="0">8 AM - 9 AM</option>
                      <option value="1">9 AM - 10 AM</option>
                      <option value="2">10 AM - 11 AM</option>
                      <option value="3">11 AM - 12 PM</option>
                      <option value="4">12 AM - 1 PM</option>
                      <option value="5">1 PM - 2 PM</option>
                      <option value="6">2 PM - 3 PM</option>
                      <option value="7">3 PM - 4 PM</option>
                      <option value="8">4 PM - 5 PM</option>
                    </select>
                  </div>

                  <div class="col-sm">
                    <h4>Confirm: </h4>
                    <button type="button" class="btn btn-warning">Book</button>
                  </div>

                  <br/>
                </div>
              </div>
              </div>}


              <h3 className="courses mt-2">Student feedback</h3>

              <div className="container">
              <div class="row">
                <div class="col-sm">
                  <div class="rating-block">
                    <h4>Average rating:</h4>
                    <h3>{tutor.rating} <small>/ 5</small></h3>
                    <div class="ratings">
                      <div>
                        <i class={`fa fa-star ${tutor.rating >=1 ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${tutor.rating >=2 ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${tutor.rating >=3 ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${tutor.rating >=4 ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${tutor.rating ==5 ? 'rating-color' : ''}`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  <hr/>
                  <div class="review-block">
                    <div class="row">
                      <div class="col-sm">
                        <img src="../profile_pic.webp" class="img-rounded" style={{width: 60, height: 60}}/>
                        <div class="review-block-name"></div>
                        <div class="review-block-date">January 29, 2016</div>
                      </div>
                      <div class="col-sm-9">
                        <div class="ratings">
                            <i class="fa fa-star rating-color"></i>
                            <i class="fa fa-star rating-color"></i>
                            <i class="fa fa-star rating-color"></i>
                            <i class="fa fa-star rating-color"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="review-block-title">Tylor Smith</div>
                        <div class="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class="col-sm-3">
                        <img src="../profile_pic.webp" class="img-rounded" style={{width: 60, height: 60}}/>
                        <div class="review-block-name"></div>
                        <div class="review-block-date">January 29, 2016</div>
                      </div>
                      <div class="col-sm-9">
                      <div class="ratings">
                          <i class="fa fa-star rating-color"></i>
                          <i class="fa fa-star rating-color"></i>
                          <i class="fa fa-star rating-color"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                      </div>
                        <div class="review-block-title">Student Name</div>
                        <div class="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                      </div>
                    </div>
                    <hr/>

                  {this.state.userType !== 'tutor' && <div class="row">
                      <div class="col-sm-3">
                        <img src="../profile_pic.webp" class="img-rounded" style={{width: 60, height: 60}}/>
                        <div class="review-block-name"></div>
                      </div>
                      <div class="col-sm-9">
                      <div class="rating">
                        <input type="radio" name="rating" value="5" id="5"/><label for="5">☆</label> <input type="radio" name="rating" value="4" id="4"/><label for="4">☆</label> <input type="radio" name="rating" value="3" id="3"/><label for="3">☆</label> <input type="radio" name="rating" value="2" id="2"/><label for="2">☆</label> <input type="radio" name="rating" value="1" id="1"/><label for="1">☆</label>
                        <br/>
                      </div>
                        <div class="comment-area">
                          <textarea class="form-control" placeholder="Add your comment here" rows="4"></textarea>
                          <div class="row-6 text-right">
                            <div class="pull-right" style={{ marginTop: '10px'}}> <button class="btn btn-warning send btn-sm">Comment </button> </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
		

              </div>  
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
        tutorDetails: state.tutors.tutors.filter(t => t._id === state.tutors.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTutor: id => dispatch(selectTutor(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((TutorDetails));
