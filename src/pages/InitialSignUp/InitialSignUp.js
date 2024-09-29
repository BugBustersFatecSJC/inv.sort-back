import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './InitialSignUp.module.css'
import MainLogo from "../../components/MainLogo/MainLogo"
import Field from "../../components/Field/Field"
import SendButton from '../../components/SendButton/SendButton'
import Watermark from '../../components/Watermark/Watermark'
import api from '../../services/api'

function InitialSignUp() {
  // const navigate = useNavigate()
  /**
   * Requisição para o login
   */
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfimartion, setUserPasswordConfirmation] = useState('')
  const userRole = 'admin'
  const userStatus = 'ativo'

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData = {
      username: userName,
      email: userEmail,
      password: userPassword,
      role: userRole,
      status: userStatus
    }

    try {
      await api
        .post('/users', userData)
        .then(response => console.log(response.data))

        setUserName('')
        setUserEmail('')
        setUserPassword('')
        setUserPasswordConfirmation('')
        
        // navigate('/login')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className='bg-[rgba(255,255,255,0.75)] w-[32%] flex justify-center h-[550px] items-center rounded'>
          <div className='w-[80%] flex flex-col items-center'>
            <div className='mb-[50px]'>
              <MainLogo/>
            </div>
            <Field name="name" type="text" placeholder="Nome" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <Field name="email" type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            <Field name="password" type="password" placeholder="Senha" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
            <Field name="password_confirmation" type="password" placeholder="Confirmar senha" value={userPasswordConfimartion} onChange={(e) => setUserPasswordConfirmation(e.target.value)}/>

            <div className='mt-[40px]'>
              <SendButton text="ENVIAR"/>
            </div>
          </div>
        </form>
        <div className='fixed bottom-0'>
          <Watermark/>
        </div>
      </div>
  )
}

export default InitialSignUp