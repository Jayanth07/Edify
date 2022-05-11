import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import { Link } from "react-router-dom"
import { PATH } from './../constants/appConstants'
import { setTutors } from '../redux/actions'
import Header from '../components/header'
import Footer from '../components/footer'

class Cards extends Component {

    state = {
        displayTutors: this.props.tutors
    }

    componentDidMount(){
        document.getElementById('filter').addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.filterTutors();
            }
        });

        if (this.props.tutors === undefined || this.state.displayTutors === undefined) {
            fetch('http://localhost:3000/tutors', {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
              .then(res => res.json())
              .then((data) => {
                  this.props.setTutors(data)
                  this.setState({ displayTutors: data })
                  console.log(data)
              })
              .catch(console.log)
        }
    }

    openDetails = (id) => {
        this.props.selectTutor(id);
    }

    filterTutors = () => {
        let text = document.getElementById('filter').value;
        if (!text) {
            this.setState({displayTutors: this.props.tutors});
            return;
        }

        let filteredTutors = this.props.tutors.filter(t => {
            // Add if name matches
            if (t.first_name.toLowerCase().includes(text) || t.last_name.toLowerCase().includes(text))
                return true;
            
            // Add if one of the courses match
            for(const c of t.courses) {
                if (c.toLowerCase().includes(text))
                    return true;
            }
            
            return false;
        });

        this.setState({displayTutors: filteredTutors})
    }

    render() {
        console.log('display list')
        console.log(this.state)
    return (
    <div >
        <Header />

        <div class="col-5 text-center" style={{ marginTop: '75px', marginLeft: 'auto', marginRight: 'auto' }}>
            <form class="d-flex align-items-center">
                <input class="form-control input-sm" style={{ height: '50px'}} id='filter' onSubmit={() => {}} type="search" placeholder="Search for Tutors or Courses..." aria-label="Search" />
                <button type="button" id='filterBtn' class="btn btn-warning btn-lg m-1" onClick={() => this.filterTutors()}>Filter</button>
            </form>
        </div>

    
        {this.state.displayTutors && this.state.displayTutors.map((tutor, id) => (
        <div class="row d-flex justify-content-center card-lay m-4" key={id}>
            <div class="col-md-7">
                <div class="card p-3 py-4">
                    <div class="text-center"> <img src={`../${tutor.path}`} width="100" class="rounded profile-picture"/>
                        <br/>
                        <b>Rating: </b>{tutor.rating} <i style={{color: '#ffb70b'}} class="bi bi-star-fill"></i>
                        <br/> <b>Total Tutoring Hours: </b> {tutor.totalTutoringHours}
                    </div>
                    <div class="text-center mt-3"> <span class="bg-secondary p-1 rounded text-white">1000+ Chats</span>&nbsp;<span class="bg-secondary p-1 rounded text-white">Certified</span>
                        <h5 class="mt-2 mb-0"><div className="tutor-info-name"> {tutor.first_name} {tutor.last_name} </div> </h5>
                        <div class="px-4 mt-1">
                            <p class="fonts" style={{fontSize: '20px'}}><i className="tutor-bio">{tutor.bio}</i></p>
                            <p class="fonts" style={{fontSize: '16px'}}><i className="tutor-bio"><b>Courses: </b>{tutor.courses}</i></p>
                        </div>
                        <div class="buttons">
                            <button class="btn btn-outline-primary px-4"><i class="bi bi-heart"></i>  Add to Favorites</button> 
                            <Link to={`${tutor._id}`}>
                                <button class="btn btn-warning px-4 ms-3 text-white" onClick={() => this.openDetails(tutor._id)}>Profile</button>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            </div>
        ))}


{/* <div >
        <div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-7">
            <div class="card p-3 py-4">
                <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/> </div>
                <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 class="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                    <div class="px-4 mt-1">
                        <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-7">
            <div class="card p-3 py-4">
                <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/> </div>
                <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 class="mt-2 mb-0">Alexender Schidmt</h5> <span>UI/UX Designer</span>
                    <div class="px-4 mt-1">
                        <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div> */}
   
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

export default connect(mapStateToProps, mapDispatchToProps)(Cards)