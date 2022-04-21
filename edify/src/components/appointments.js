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
        if (this.props.tutors === undefined || this.state.displayTutors === undefined) {
            fetch('http://localhost:3000/appointments', {
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
                    <div class="text-center"> <img src={tutor.path} width="100" class="rounded profile-picture"/><br/> <b>Rating: </b>{tutor.rating} <i style={{color: '#ffb70b'}} class="bi bi-star-fill"></i></div>
                    <div class="text-center mt-3"> <span class="bg-secondary p-1 rounded text-white">1000+ Chats</span>&nbsp;<span class="bg-secondary p-1 rounded text-white">Certified</span>
                        <h5 class="mt-2 mb-0"><div className="tutor-info-name"> {tutor.first_name} {tutor.last_name} </div> </h5>
                        <div class="px-4 mt-1">
                            <p class="fonts" style={{fontSize: '20px'}}><i className="tutor-bio">{tutor.bio}</i></p>
                            <p class="fonts" style={{fontSize: '16px'}}><i className="tutor-bio"><b>Courses: </b>{tutor.courses}</i></p>
                        </div>
                        <div class="buttons">
                            <button class="btn btn-outline-primary px-4">Message</button> 
                            <Link to={`${tutor._id}`}>
                                <button class="btn btn-warning px-4 ms-3 text-white" onClick={() => this.openDetails(tutor._id)}>Profile</button>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
            </div>
        ))}
   
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