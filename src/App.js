import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/404';
import Profile from './components/Profile';
import Add from './components/Add';
import ApartmentDetails from './components/ApartmentDetails';
import SearchBar from './components/SearchBar';
import { useState } from 'react';


function App() {
  const [locatedApartments, setLocatedApartments] = useState([]);

  return (
    <Router>
      <div className="App"> 
        <Navbar/>
        <div className='content'>
        <Routes>
          <Route exact path="/" element={
            <>
            <SearchBar setLocatedApartments={setLocatedApartments} />
            <Home locatedApartments={locatedApartments} />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/apartment/:id" element={<ApartmentDetails />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;