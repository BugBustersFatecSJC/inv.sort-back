import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login/Login'; 

function App() {
  return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/user" element={<UserPage />} />
//       </Routes>
//     </Router>

    <div>
      <Login />
    </div>
  );
}

export default App;
