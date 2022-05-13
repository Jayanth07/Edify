import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import Header from '../components/header'
import Footer from '../components/footer'

class TutorDetails extends Component {

  state = {
      token: sessionStorage.getItem('token'),
      userType: sessionStorage.getItem('userType'),
      feedbacks: {},
      slots: []
  }

  componentDidMount() {
    let date = document.getElementById('startDate');
    let today = new Date().toISOString().slice(0, 10);

    if (date) {
      window.scrollTo(0, 0);
      date.defaultValue = today;
      date.onchange = () => {
        console.log(date.value)
        this.getAppointmentSlots(date.value)
      }
    }
    fetch(`http://localhost:3000/feedbacks/${this.props.tutorDetails[0]._id}`, {
      method: 'get',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
		})
		.then( res => res.json() )
		.then( (data) => {
      this.setState({ ...this.state, feedbacks: data })
    })
		.catch((e) => {
      console.log(e)
    })

    if (date) {
      this.getAppointmentSlots(today)
    }

  }

  bookAppointment = (tutorName) => {
    let date = document.getElementById('startDate');
    let slot = parseInt(document.getElementById('slot').value);
    slot = (slot < 7) ? slot + 12 : slot;

console.log(new Date(date.value + "T" + (slot < 10 ? '0' + slot : '' + slot) + ":00:00"))

    fetch(`http://localhost:3000/appointments`, {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        {
          token: sessionStorage.getItem('token'),
            tutor_id: this.props.tutorsId,
            tutorName: tutorName,
            start_date_time: date.value + "T" + (slot < 10 ? '0' + slot : '' + slot) + ":00:00",
            end_date_time: date.value + "T" + ((slot + 1) < 10 ? '0' + (slot + 1) : '' + (slot + 1)) + ":00:00",
            notes: "Waiting to learn from you!",
            status: "SCHEDULED"
        }
    )
    })
    .then( res => res.json() )
    .then( (data) => {
      window.location.href = 'http://localhost:3001/appointments';
    })
    .catch(console.log)
  }

  getAppointmentSlots = (date) => {
    fetch(`http://localhost:3000/appointments/currentappointments`, {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        tutor_id: this.props.tutorsId,
        token: sessionStorage.getItem('token'),
        selected_date: date
      })
    })
    .then( res => res.json() )
    .then( (data) => {
      this.setState({...this.state, slots: data})
    })
    .catch(console.log)
  }

  comment(tutorId) {
    const rating = document.querySelector('input[name=rating]:checked').value;
    const note = document.getElementById('comment').value;

    fetch('http://localhost:3000/feedbacks', {
      method: 'post',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        rating: parseInt(rating),
        comment: note,
        token: sessionStorage.getItem('token'),
        tutor_id: tutorId
      })
		})
		.then( res => res.json() )
		.then( (data) => {
      window.location.href = 'http://localhost:3001/tutors'
		})
		.catch((e) => {
      console.log(e)
    })
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
                 <div className="course-details" style={{color: 'black'}}>{tutor.total_tutoring_hours}</div>
               </div>
              <br/>

              {this.state.userType !== 'tutor' && <div>
              <h3 className="courses">Appointments</h3>

              <div class="rating-block">
                <div class="row">

                  <div class="col-sm">
                      <h4>Start date:</h4>
                      <input className='rounded' type="date" id="startDate" name="trip-start" ></input>
                  </div>
                  
                  <div class="col-sm">
                    <h4>Time Slot: </h4>
                    <select class="form-select" id='slot' aria-label="Default select example">
                      {
                        this.state.slots && this.state.slots.map((s, i) => (
                          <option value={parseInt(s.slice(0,2))}>{s}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div class="col-sm">
                    <h4>Confirm: </h4>
                    <button type="button" id='book' onClick={() => this.bookAppointment(tutor.first_name + ' ' + tutor.last_name)} class="btn btn-warning">Book</button>
                  </div>

                  <br/>
                </div>
              </div>
              </div>}

                <div>

              <h3 className="courses mt-2">Student feedback</h3>

              <div className="container">
              <div class="row">
                <div class="col-sm">
                  <div class="rating-block">
                    <h4>Average rating:</h4>
                    <h3>{( Math.round((this.state.feedbacks ? this.state.feedbacks.avg_rating : 0)*100,2)/100)} <small>/ 5</small></h3>
                    <div class="ratings">
                      <div>
                        <i class={`fa fa-star ${(this.state.feedbacks && this.state.feedbacks.avg_rating >= 1) ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${(this.state.feedbacks && this.state.feedbacks.avg_rating >= 2) ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${(this.state.feedbacks && this.state.feedbacks.avg_rating >= 3) ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${(this.state.feedbacks && this.state.feedbacks.avg_rating >= 4) ? 'rating-color' : ''}`}></i>
                        <i class={`fa fa-star ${(this.state.feedbacks && this.state.feedbacks.avg_rating == 5) ? 'rating-color' : ''}`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  <hr/>
                  <div class="review-block">
                    {
                      this.state.feedbacks && this.state.feedbacks.comments && this.state.feedbacks.comments.map(c => {
                        return (
                        <div>
                        <div class="row">
                      <div class="col-sm">
                        <img src="../profile_pic.webp" class="img-rounded" style={{width: 60, height: 60}}/>
                        <div class="review-block-name"></div>
                      </div>
                      <div class="col-sm-9">
                        <div class="ratings">
                            <i class={`fa fa-star ${c.rating >=1 ? 'rating-color' : ''}`}></i>
                            <i class={`fa fa-star ${c.rating >=2 ? 'rating-color' : ''}`}></i>
                            <i class={`fa fa-star ${c.rating >=3 ? 'rating-color' : ''}`}></i>
                            <i class={`fa fa-star ${c.rating >=4 ? 'rating-color' : ''}`}></i>
                            <i class={`fa fa-star ${c.rating ==5 ? 'rating-color' : ''}`}></i>
                        </div>
                        <div class="review-block-title">{c.student_name}</div>
                        <div class="review-block-description">{c.comment}</div>
                      </div>
                    </div>
                    <hr/>
                    </div>
                      )})
                    }
                    
                  {this.state.token && this.state.userType !== 'tutor' && <div class="row">
                      <div class="col-sm-3">
                        <img src="../profile_pic.webp" class="img-rounded" style={{width: 60, height: 60}}/>
                        <div class="review-block-name"></div>
                      </div>
                      <div class="col-sm-9">
                      <div class="rating">
                        <input type="radio" name="rating" value={5} id="5"/><label for="5">☆</label> <input type="radio" name="rating" value={4} id="4"/><label for="4">☆</label> <input type="radio" name="rating" value={3} id="3"/><label for="3">☆</label> <input type="radio" name="rating" value={2} id="2"/><label for="2">☆</label> <input type="radio" name="rating" value={1} id="1"/><label for="1">☆</label>
                        <br/>
                      </div>
                        <div class="comment-area">
                          <textarea class="form-control" id="comment" placeholder="Add your comment here" rows="4"></textarea>
                          <div class="row-6 text-right">
                            <div class="pull-right" style={{ marginTop: '10px'}}> <button class="btn btn-warning send btn-sm" id="commentBtn" onClick={() => {this.comment(tutor._id)}}>Comment </button> </div>
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
