import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTutor } from '../redux/actions'
import { Link } from "react-router-dom"
import { PATH } from './../constants/appConstants'

class Cards extends Component {
    openDetails = (id) => {
        this.props.selectTutor(id);
    }

    render() {

    return (
    <div>
        <Link to={PATH.TUTOR_DETAILS}>
         <div id='tutor1' onClick={() => this.openDetails(1)}>Tutor 1</div>
        </Link>

        
        <Link to={PATH.TUTOR_DETAILS}>
         <div id='tutor2' onClick={() => this.openDetails(2)}>Tutor 2</div>
        </Link>    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTutor: id => dispatch(selectTutor(id))
    }
}

export default connect(null, mapDispatchToProps)(Cards)