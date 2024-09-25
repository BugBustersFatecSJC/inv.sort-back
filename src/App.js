import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import UserPage from './pages/UserPage';
import logo from './logo.svg';
import './App.css';


function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-blue-500">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <nav>
          <Link to="/user" className="App-link">Go to User Page</Link>
        </nav>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
