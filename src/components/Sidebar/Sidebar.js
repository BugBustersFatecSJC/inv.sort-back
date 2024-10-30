import { Link } from 'react-router-dom';
import Watermark from '../Watermark/Watermark'
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import React, { useState, useEffect ,  } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
function Sidebari(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = React.useState(false);

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
    <div className={` flex ${windowWidth > 570 ? 'max-w-[14rem]' : 'max-w-[8rem]'} bg-clip-border alt-color-bg  py-4`}>
      <div className='mb-8 justify-center self-center flex-col flex-wrap max-w-[14rem] w-full h-full mr-4 align-center text-center py-4 px-2'>
        <div className='text-center align-middle flex justify-center'>
          <img src="img/logo_invsort.svg" className="w-[50%] sm:w-[20%] auto sb-button z-10"  onClick={() => setCollapsed(!collapsed)} alt=""/>
        </div>
        {props.content}
        <div className="mt-[40px] w-full"> 
       
        <Sidebar className='mx-auto'  collapsed={collapsed} 
 backgroundColor='' width='100%'>
  <Menu 
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            
            if (level === 0)
              return {
                color: 'rgb(255,195,118)',
                [`&.active`]: {
                  backgroundColor: 'black',
                  color: '#b6c8d9',
                },
                
              }
              
          ;},
        }}
      className='mb-12' >
        
    <MenuItem className='MenuItem poppins-semibold' icon={<img id='carrinho' src="/images/grocery-store.png" />} component={<Link to="/products" />}> Produtos</MenuItem>
    <MenuItem className='MenuItem poppins-semibold' component={<Link to="/analytics" />}> Analise</MenuItem>
    <MenuItem className='MenuItem poppins-semibold' component={<Link to="/stockmovements" />}> Movimentações</MenuItem>
    <MenuItem className='MenuItem poppins-semibold' component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    <MenuItem className='MenuItem poppins-semibold' component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
  </Menu>
  
  <Watermark  className="bottom-0"/>
        
</Sidebar>;

          

        
        </div>
        
      </div>
      
    </div>
    
  )
}

export default Sidebari
