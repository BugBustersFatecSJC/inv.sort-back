import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Watermark from '../Watermark/Watermark';
import { UserContext } from '../../context/userContext';

function Sidebari({ content }) {
  const { role } = useContext(UserContext);
  console.log('Current user role from context:', role);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth > 640) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [windowWidth]);

  return (
    <>
      <div className={`flex bg-clip-border alt-color-bg`}>
        <div className="mb-8  sm:w-full justify-center self-center flex-col flex-wrap h-full align-center text-center py-4">
          <div className="text-center mx-auto self-center align-middle flex justify-center z-20   ">
            {windowWidth > 450 ? (
              <img
                src={'/img/logo_invsort.png'}
                className={`w-[50%] mx-auto sm:w-[40%] h-full mt-4 sb-button `}
                onClick={() => {
                  if (windowWidth > 640) {
                    setCollapsed(!collapsed);
                  } else {
                    setToggled(!toggled);
                  }
                }}
                alt=""
              />
            ) : null}
          </div>

        
          <div className="mt-[40px] flex justify-center text-center self-center">
            <Sidebar
              className="text-center m-auto w-full"
              onBackdropClick={() => setToggled(false)}
              toggled={toggled}
              breakPoint="always"
            >
              <Menu
                menuItemStyles={{
                  button: ({ level, active, disabled }) => {
                    if (level === 0)
                      return {
                        color: 'rgb(255,195,118)',
                        [`&.active`]: {
                          backgroundColor: '#B45105',
                          color: '#b6c8d9',
                        },
                        [`&:hover`]: {
                          backgroundColor: '#3E1900',
                        },
                      };
                  },
                }}
                className="mb-12"
              >
                <MenuItem
                  className="MenuItem w-full poppins-semibold"
                  icon={<img id="carrinho" src="/images/grocery-store.png" />}
                  component={<Link to="/products" />}
                >
                  {collapsed }
                </MenuItem>
                <MenuItem
                  className="MenuItem poppins-semibold"
                  icon={<img id="chart" className="" src="/images/pie-chart.png" />}
                  component={<Link to="/analytics" />}
                >
                  Análise
                </MenuItem>
                <MenuItem
                  className="MenuItem poppins-semibold"
                  icon={<img id="chart" src="/images/arrows.png" />}
                  component={<Link to="/stockmovements" />}
                >
                  Movimentações
                </MenuItem>
                

                
                {(role === 'admin' || role === 'gerente') && (
                  <SubMenu
                    icon={<img id="chart" src="/images/profile.png" />}
                    label="Gerenciar"
                    className="poppins-semibold"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <MenuItem
                      className="poppins-semibold"
                      component={<Link to="/userpage" />}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3E1900'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b3710'}
                      style={{
                        backgroundColor: '#6b3710',
                        color: 'rgb(255,195,118)',
                        margin: '0',
                        border: 'none',
                        padding: '10px',
                        transition: 'background-color 0.3s ease',
                        width: collapsed ? '40px' : '200px',
                        height: '40px',
                      }}
                    >
                      {collapsed ? 'Usuários' : 'Gerenciar Usuários'}
                    </MenuItem>
                    <MenuItem
                      className="poppins-semibold"
                      component={<Link to="/settings" />}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3E1900'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b3710'}
                      style={{
                        backgroundColor: '#6b3710',
                        color: 'rgb(255,195,118)',
                        margin: '0',
                        border: 'none',
                        padding: '10px',
                        transition: 'background-color 0.3s ease',
                        width: collapsed ? '40px' : '200px',
                        height: '40px',
                        width:'100%',
                      }}
                    >
                      {collapsed ? 'Config' : 'Configurações'}
                    </MenuItem>
                    {/* Adicione outros subitens de gerenciar conforme necessário */}
                  </SubMenu>
                )}
              </Menu>

              <Watermark className="bottom-0" />
            </Sidebar>

            {windowWidth > 450 ? (
              <Sidebar id="collapse" width="13.85rem" collapsedWidth="4rem" collapsed={!collapsed}>
                <Menu
                  menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                      if (level === 0)
                        return {
                          color: 'rgb(255,195,118)',
                          [`&.active`]: {
                            backgroundColor: '#B45105',
                            color: '#b6c8d9',
                          },
                          [`&:hover`]: {
                            backgroundColor: '#3E1900',
                          },
                        };
                    },
                  }}
                  className="mb-12 w-full"
                >
                  <MenuItem
                    className="MenuItem  w-full poppins-semibold"
                    title=""
                    icon={<img id="carrinho" alt="produtos" src="/images/grocery-store.png" />}
                    component={<Link to="/products" />}
                  >
                    {windowWidth > 640 ? 'Produtos' : ''}
                  </MenuItem>
                  <MenuItem
                    className="MenuItem  poppins-semibold"
                    title=""
                    icon={<img id="chart" className="" src="/images/pie-chart.png" />}
                    component={<Link to="/analytics" />}
                  >
                    {windowWidth > 640 ? 'Analise' : ''}
                  </MenuItem>
                  <MenuItem
                    className="MenuItem poppins-semibold"
                    title=""
                    icon={<img id="chart" src="/images/arrows.png" />}
                    component={<Link to="/stockmovements" />}
                  >
                    {windowWidth > 640 ? 'Movimentações' : ''}
                  </MenuItem>
                  

                  
                  {(role === 'admin' || role === 'gerente') && (
                    <SubMenu
                      icon={<img id="chart" src="/images/profile.png" />}
                      label={!collapsed ? '' : 'Gerenciar'}
                      className="poppins-semibold"
                    >
                      <MenuItem
                        className="poppins-semibold"
                        component={<Link to="/userpage" />}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3E1900'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b3710'}
                        style={{
                          backgroundColor: '#6b3710',
                          color: 'rgb(255,195,118)',
                          margin: '0',
                          border: 'none',
                          padding: '10px',
                          transition: 'background-color 0.3s ease',
                          width: collapsed ? '200px' : '40px', 
                          height: '40px',
                        }}
                      >
                        {collapsed ? 'Gerenciar Usuários' : (
                          <img
                            id="user-icon"
                            src="/images/profile.png"
                            alt="gerenciar usuários"
                            style={{
                              width: '24px',
                              height: '24px',
                            }}
                          />
                        )}
                      </MenuItem>
                      <MenuItem
                        className="poppins-semibold"
                        component={<Link to="/settings" />}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3E1900'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b3710'}
                        style={{
                          width:'100%',
                          backgroundColor: '#6b3710',
                          color: 'rgb(255,195,118)',
                          margin: '0',
                          border: 'none',
                          padding: '10px',
                          transition: 'background-color 0.3s ease',
                          width: collapsed ? '200px' : '40px', 
                          height: '40px',
                        }}
                      >
                        {collapsed ? 'Configurações' : (
                          <img
                            id="settings-icon"
                            src="/images/settings.png"
                            alt="configurações"
                            style={{
                              width: '24px',
                              height: '24px',
                            }}
                          />
                        )}
                      </MenuItem>
                      
                    </SubMenu>
                  )}
                </Menu>
              </Sidebar>
            ) : null}
          </div>
        </div>
      </div>

      {windowWidth < 450 ? (
        <div className="w-[35px] h-[33px] rounded-md border-2 border-[#6B3710] bg-[#6B3710] absolute m-1">
          <img
            src={'/images/menu.png'}
            className="object-fit w-full h-full sb-button"
            onClick={() => {
              if (windowWidth > 640) {
                setCollapsed(!collapsed);
              } else {
                setToggled(!toggled);
              }
            }}
            alt="menu"
          />
        </div>
      ) : null}
    </>
  );
}

export default Sidebari;
