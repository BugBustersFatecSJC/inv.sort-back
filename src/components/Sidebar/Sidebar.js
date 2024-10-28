import React from 'react'
import Watermark from '../Watermark/Watermark'
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import React, { useState, useEffect } from 'react';


function Sidebar(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex sm: max-w-[14rem] bg-clip-border alt-color-bg min-h-screen   max-w-[8rem] py-4">
      <a className='text-[100px] decoration-none poppins-semibold text-start'>></a>
    </div>
  )
}

export default Sidebar
