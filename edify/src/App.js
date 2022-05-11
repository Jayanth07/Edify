import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import SearchTutors from './pages/SearchTutors';
import Cards from './components/cards';
import TutorDetails from './components/tutorDetails';
import { createHashHistory } from "history";
import { PATH } from './constants/appConstants'
import Appointments from './components/appointments';
import AppointmentDetails from './components/appointmentDetails';
import Login from './components/login';
import SignUp from './components/signup';

function App(props) {

  return (
    <BrowserRouter history={createHashHistory()} store={props.store}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route exact path={PATH.LOGIN} element={<Login />} />
        <Route exact path={PATH.SIGNUP} element={<SignUp />} />
        <Route exact path={PATH.HOME} element={<SearchTutors />} />
        <Route exact path={PATH.TUTORS} element={<Cards />} />
        <Route exact path={PATH.TUTOR_DETAILS} element={<TutorDetails />} />
        <Route exact path={PATH.APPOINTMENTS} element={<Appointments />} />
        <Route exact path={PATH.APPOINTMENT_DETAILS} element={<AppointmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
