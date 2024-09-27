import React from 'react'
import styles from './MainLogo.module.css'

function MainLogo() {
  return (
    <figure className='flex flex-col items-center'>
        <img src='/img/logo.svg' alt="" />
        <h1 className={`font-pixel text-4xl ${styles.pulsingText}`}>Bem-vindo!</h1>
    </figure>
  )
}

export default MainLogo