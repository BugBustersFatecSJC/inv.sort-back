import { useState, useEffect, useContext } from 'react'; // Import useContext
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
  const navigate = useNavigate();
  const { setRole } = useContext(UserContext); // Use useContext para acessar setRole

  useEffect(() => {
    api.get('/check-login')
      .then(response => {
        if (response.data.needsRegistration) {
          navigate('/cadastro');
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
      const response = await api.post('/login', data);
      const userData = response.data;

      localStorage.setItem("user", JSON.stringify(userData));
      api.defaults.headers["X-User-Id"] = userData.user_id;
      setRole(userData.role); // Certifique-se de que setRole está acessível aqui
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
          <p href="#">Lembrar-me
            <input className='ms-2 rounded shadow-none border' type="checkbox" />
          </p>
        </div>
        <div className='mt-[40px]'>
          <SendButton text="ENTRAR" />
        </div>
        <a className='font-pixel mt-[20px] secondary-color' href='#'>Não tem cadastro?</a>
      </form>
      <div className='fixed bottom-0'>
        <Watermark />
      </div>
    </div>
  );
}

export default Login;
