import React from 'react'
import styles from './Login.module.css'
import MainLogo from "../../components/MainLogo/MainLogo"
import Field from "../../components/Field/Field"
import SendButton from '../../components/SendButton/SendButton'
import Watermark from '../../components/Watermark/Watermark'


function Login() {
  return (
    <div className='main-color-bg h-screen flex flex-col items-center justify-center'>
        <form className='flex flex-col items-center w-[30%]'>
            <div className='mb-[50px]'>
                <MainLogo/>
            </div>
            <Field name="email" type="email" placeholder="Email"/>
            <Field name="password" type="password" placeholder="Senha"/>
            <div className='font-pixel flex justify-between w-full secondary-color'>
                <a href='#'>
                    Esqueceu sua senha?
                </a>
                <p href="#">
                    Lembrar-me
                    <input className='ms-2 rounded shadow-none border' type="checkbox"/>
                </p>
            </div>

            <div className='mt-[40px]'>
                <SendButton text="ENTRAR"/>
            </div>
            <a className='font-pixel mt-[20px] secondary-color' href='#'>
                Não tem cadastro?
            </a>
        </form>
        <div className='fixed bottom-0'>
          <Watermark/>
        </div>
    </div>
  )
}

export default Login