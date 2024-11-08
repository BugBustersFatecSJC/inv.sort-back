import { Link } from 'react-router-dom';
import Watermark from '../Watermark/Watermark'
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import React, { useState, useEffect ,  } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
function Sidebari(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (windowWidth > 640) {
      
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [windowWidth]);

  return (<></>
  )
}

export default Sidebari
