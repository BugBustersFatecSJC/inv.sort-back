import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login/Login'; 
import InitialSignUp from './pages/InitialSignUp/InitialSignUp'
import api from "./services/api"
import MainPage from './pages/MainPage/MainPage';

function App() {
  /**
   * Funcionalidade para checar se algum usuário no banco de dados, se sim,
   * exibirá a tela de login, senão o usuário será redirecionado para a tela
   * de primeiro cadastro
   */
  const [adminExists, setAdminExists] = useState(false);
  useEffect(() => {
    api
      .get("/users")
      .then(response => setAdminExists(response.data.exists))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/user" element={<UserPage />} />
//       </Routes>
//     </Router>

    <div>
      {/* {adminExists ? <Login /> : <InitialSignUp />} */}
      <MainPage />
    </div>
  );
}

export default App;
