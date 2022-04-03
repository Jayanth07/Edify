import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { selectTutor } from '../redux/actions'

class TutorDetails extends Component {

    render() {
    return (
        <div>
            <Link to="/tutors">
            <div id='back' onClick={() => this.props.selectTutor(undefined)}>Go back</div>
            </Link>
            <h1>{this.props.tutorsId} is the selected tutor's id</h1>
        </div>
    )
  }

}

const mapStateToProps = state => {
    return {
        tutorsId: state.tutors.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTutor: id => dispatch(selectTutor(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetails);
