import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import { Link } from "react-router-dom"
import { PATH } from './../constants/appConstants'
import { setTutors } from '../redux/actions'

import Header from '../components/header'
import Footer from '../components/footer'

class Cards extends Component {

    componentDidMount(){
        if (this.props.tutors === undefined) {
            fetch('tutors.json', {
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json'
                }
              })
              .then( res => res.json() )
              .then( (data) => {
                  this.props.setTutors(data)
                  console.log(data)
              })
              .catch(console.log)
        }
    }

    openDetails = (id) => {
        this.props.selectTutor(id);
    }

    render() {

    console.log('Here are tutors')
    console.log(this.props)
    return (
    <div>
			<Header />

    
        {this.props.tutors && this.props.tutors.map( (tutor, id) => (
    <div class="row d-flex justify-content-center card-lay m-4" key={id}>
    <div class="col-md-7">
    <div class="card p-3 py-4">
    <div class="text-center"> <img src={tutor.path} width="100" class="rounded-circle"/> </div>
    <div class="text-center mt-3"> <span class="bg-secondary p-1 rounded text-white">1000+ Chats</span>&nbsp;<span class="bg-secondary p-1 rounded text-white">Certified</span>
    <h5 class="mt-2 mb-0"><div className="tutor-info-name"> {tutor.first_name} {tutor.last_name} </div> </h5>
    <div class="px-4 mt-1">
    <p class="fonts"><h3><i className="tutor-bio">{tutor.bio}</i></h3></p>
    </div>
    <div class="buttons"> <button class="btn btn-outline-primary px-4">Message</button> 
    <Link to={PATH.TUTOR_DETAILS}>
    <button class="btn btn-primary px-4 ms-3" onClick={() => this.openDetails(tutor.id)}>Profile</button>
        </Link>    </div>
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

        
        <Link to={PATH.TUTOR_DETAILS}>
         <div id='tutor2' onClick={() => this.openDetails(2)}>Tutor 2</div>
        </Link>    
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