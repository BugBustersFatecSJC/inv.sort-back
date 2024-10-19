import React, { useState, useEffect } from 'react'
import './FlashMessage.css'

const FlashMessage = ({ message, type, duration, onClose }) => {
  const [visible, setVisible] = useState(true)
  const [exit, setExit] = useState(false)

  /**
   * Criação de timer para fazer a mensagem aparecer/desaparecer
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true)
      setTimeout(() => {
        onClose()
      }, 500)
    }, duration - 500)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!visible) return null

  /**
   * Lógica para selecionar a imagem de acordo com o tipo
   */
  const getImageSrc = () => {
    switch (type) {
      case 'success':
        return '/img/like.png'
      case 'error':
        return '/img/alien.png'
      default:
        return '/img/cofee-cup.png'
    }
  }

  return (
    <div className={`flash-message ${type} font-pixel text-xl ${exit ? 'exit' : ''}`}>
      <img src={getImageSrc()} alt="icon" className="icon w-6 h-6" />
      <p>{message}</p>
    </div>
  )
}

export default FlashMessage
