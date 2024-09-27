import React from 'react'

function SendButton(props) {
  return (
    <div>
        <button className='px-5 py-1 quarternary-color-bg rounded font-pixel text-2xl' type="submit">{props.Text}</button>
    </div>
  )
}

export default SendButton