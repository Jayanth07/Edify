import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import SearchTutors from './pages/SearchTutors';
import Cards from './components/cards';
import TutorDetails from './components/tutorDetails';
import { createBrowserHistory } from "history";
import { PATH } from './constants/appConstants'
import Appointments from './components/Appointments';

function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route exact path={PATH.HOME} element={<SearchTutors />} />
        <Route exact path={PATH.TUTORS} element={<Cards />} />
        <Route exact path={PATH.TUTOR_DETAILS} element={<TutorDetails />} />
        <Route exact path={PATH.APPOINTMENTS} element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
