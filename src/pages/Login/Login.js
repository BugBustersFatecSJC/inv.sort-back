import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import MainLogo from "../../components/MainLogo/MainLogo";
import Field from "../../components/Field/Field";
import SendButton from '../../components/SendButton/SendButton';
import Watermark from '../../components/Watermark/Watermark';
import { UserContext } from '../../context/userContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser, setRole } = useContext(UserContext);

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === 'true';
    const storedUser = localStorage.getItem("user");

    if (storedRememberMe && storedUser) {
      const userData = JSON.parse(storedUser);
      api.defaults.headers["X-User-Id"] = userData.user_id;
      setUser(userData);
      setRole(userData.role);
      navigate('/products');
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [navigate, setRole, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with email: ", email);
    try {
      const data = { email, password };
      const response = await api.post('/login', data);
      const userData = response.data;
      setUser(userData);
      setRole(userData.role);

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("rememberMe", 'true');
      } else {
        localStorage.removeItem("user");
        localStorage.setItem("rememberMe", 'false');
      }
      
      api.defaults.headers["X-User-Id"] = userData.user_id;
      navigate('/products');
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert("Usuário ou Senha Inválidos");
    }
  };

  return (
    <div className='main-color-bg h-screen flex flex-col items-center justify-center'>
      <form className='flex flex-col items-center w-[30%]' onSubmit={handleSubmit}>
        <div className='mb-[50px]'>
          <MainLogo />
        </div>
        <Field name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field name="password" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='font-pixel flex justify-between w-full secondary-color'>
          <a href='/cadastro'>Esqueceu sua senha?</a>
          <label>
            Lembrar-me
            <input
              className='ms-2 rounded shadow-none border'
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>
        </div>
        <div className='mt-[40px]'>
          <SendButton text="ENTRAR" />
        </div>
        <a className='font-pixel mt-[20px] secondary-color' href='/cadastro'>Não tem cadastro?</a>
      </form>
      <div className='fixed bottom-0'>
        <Watermark />
      </div>
    </div>
  );
}

export default Login;