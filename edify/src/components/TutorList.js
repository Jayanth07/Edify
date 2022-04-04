import React from 'react';

import {Container, Row, Col, Box} from 'react-bootstrap'


//rendering of json and callin tutors js
// state = {
//         tutors:[]
//       }

//       componentDidMount(){
//         fetch('tutors.json', {
//           headers : { 
//             'Content-Type': 'application/json',
//              'Accept': 'application/json'
//           }
//         })
//         .then( res => res.json() )
//         .then( (data) => {
//             this.setState({ tutors: data })
//             console.log( this.state.tutors)
//         })
//         .catch(console.log)
//       }


//       render () {
//          return (
//             <Tutors tutorslist={this.state.tutors}/>
//         );
 
//       }  



const TutorList = (props) => {
    console.log(props)
    let tutor = props.tutorsinfo[0];
    return (
        <Container className="mt-8">
        <Row>
        {
            // props.tutorsinfo.map( (tutor, id) => (
            //             <Col xs="3">
                            <div className="row d-flex justify-content-center card-lay" key={1}>
                                <div className="col-md-7">
                                    <div className="card p-3 py-4">
                                        <div className="text-center"> <img src={tutor.path} width="100" className="rounded-circle"/> </div>
                                        <div className="text-center mt-3"> <span className="bg-secondary p-1 rounded text-white">1000+ Chats</span>&nbsp;<span className="bg-secondary p-1 rounded text-white">Certified</span>
                                            <h5 className="mt-2 mb-0"><div className="tutor-info-name"> {tutor.first_name}  {tutor.last_name} </div> </h5> 
                                            <div className="px-4 mt-1">
                                                <p className="fonts"><h3><i className="tutor-bio">{tutor.bio}</i></h3></p>
                                            </div>
                                            <div className="buttons"> <button className="btn btn-outline-primary px-4">Message</button> <button className="btn btn-primary px-4 ms-3">Profile</button> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            // </Col>
        // ))
        }
        </Row>
        </Container>
    
      );

}


export default TutorList;