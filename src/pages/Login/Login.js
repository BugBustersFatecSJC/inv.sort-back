import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import MainLogo from "../../components/MainLogo/MainLogo";
import Field from "../../components/Field/Field";
import SendButton from '../../components/SendButton/SendButton';
import Watermark from '../../components/Watermark/Watermark';
import axios from 'axios';
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        email,
        password,
      }; // Create a data object with email and password

      // const response = await axios.post('http://localhost:3001/login', data); // Send the data object in the request bod
      await api
       .post("/login",data)
       .then(function(response){
        localStorage.setItem("user",JSON.stringify(response.data))
       })
       navigate('/products');
      //  .then(data => {
      //     console.log(data)
      //    localStorage.setItem('user', JSON.stringify(data)); // Armazena no localStorage
      //  })
      //  .then(response => localStorage.setItem( "user_id", response.user_id))
      //  .then(response => localStorage.setItem( "username", response.username))
      //  .then(response => localStorage.setItem( "email", response.email))
      //  .then(response => localStorage.setItem( "role",response.role))

          // ,
          // ,
          // ,
          // "created_at", response.role,
          // "status", response.role,
          // "user_img", response.user.

      // if (response.status === 200) {
      //   // Requisição bem-sucedida, redirecionar para outra página
        
      //   console.log(response)
      // } else {
      //   // Tratar erros caso o status não seja 200
      //   console.error('Falha ao fazer login:', response.data);
      // }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleClick = () => {
    // Access and use the email and password values here
    console.log('Email:', email);
    console.error('Password:', password); // Use console.error for passwords for security reasons

    handleSubmit(); // Call the handleSubmit function
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