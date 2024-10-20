import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './Login.module.css';
import MainLogo from "../../components/MainLogo/MainLogo";
import Field from "../../components/Field/Field";
import SendButton from '../../components/SendButton/SendButton';
import Watermark from '../../components/Watermark/Watermark';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // UseEffect para verificar se precisamos redirecionar para o cadastro
  useEffect(() => {
    api.get('/check-login')
      .then(response => {
        if (response.data.needsRegistration) {
          navigate('/cadastro'); // Redireciona para cadastro se necessário
        }
      })
      .catch(error => {
        console.error("Erro ao verificar usuários:", error);
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };

      await api.post('/login', data)
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate('/products'); // Redireciona após login bem-sucedido
        });
        api.defaults.headers["X-User-Id"] = JSON.parse(localStorage.getItem("user"))?.user_id;
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
          <a href='#'>
            Esqueceu sua senha?
          </a>
          <p href="#">
            Lembrar-me
            <input className='ms-2 rounded shadow-none border' type="checkbox" />
          </p>
        </div>

        <div className='mt-[40px]'>
          <SendButton text="ENTRAR" />
        </div>
        <a className='font-pixel mt-[20px] secondary-color' href='#'>
          Não tem cadastro?
        </a>
      </form>
      <div className='fixed bottom-0'>
        <Watermark />
      </div>
    </div>
  );
}

export default Login;
