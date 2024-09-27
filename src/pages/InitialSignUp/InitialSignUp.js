import React from 'react'
import styles from './InitialSignUp.module.css'
import MainLogo from "../../components/MainLogo/MainLogo"
import Field from "../../components/Field/Field"
import SendButton from '../../components/SendButton/SendButton'
import Watermark from '../../components/Watermark/Watermark'

function InitialSignUp() {
  return (
    <div className={styles.mainContainer}>
        <form action="" className='bg-[rgba(255,255,255,0.75)] w-[32%] flex justify-center h-[550px] items-center rounded'>
          <div className='w-[80%] flex flex-col items-center'>
            <div className='mb-[50px]'>
              <MainLogo/>
            </div>
            <Field name="name" type="text" placeholder="Nome"/>
            <Field name="email" type="email" placeholder="Email"/>
            <Field name="password" type="password" placeholder="Senha"/>
            <Field name="password_confirmation" type="password" placeholder="Confirmar senha"/>

            <input value="admin" type="hidden" name="role" />
            <input value="ativo" type="hidden" name="status" />

            <div className='mt-[40px]'>
              <SendButton text="ENTRAR"/>
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