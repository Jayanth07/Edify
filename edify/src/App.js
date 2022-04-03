import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home';
import SearchTutors from './pages/SearchTutors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='tutors' element={<SearchTutors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
