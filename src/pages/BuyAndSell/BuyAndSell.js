import React from 'react'
import MainPage from '../MainPage/MainPage';
import SearchBar from '../../components/SearchBar/SearchBar'
import ProductRow from '../../components/ProductRow/ProductRow2';
import ProductTable from '../../components/ProductTable/ProductTable2';
// Pagina para registrar compra e venda de estoque
function BuyAndSell() {
  return (
    <MainPage title="Compra e Venda">
    <div className="flex  bg-[rgb(255,195,118)] ">
      {/* Conteúdo */}
      <section className="border-0 border-[rgb(180,81,5)] h-full w-full shadow-sm shadow-inner">
        {/* Barra de pesquisa */}
         
         <ProductTable/> 

        
          
            {/* Metade 2 */}{/* 
            <div className="w-[50%]">
              <h1 className="vt323-regular pb-1">Fornecedor</h1>

              <div className="vt323-regular flex w-[100%] flex-col">
                <label htmlFor="nomeForn">Nome</label>
                <textarea
                  className="resize-none w-[100%] px-2 break-words border-[rgb(245,166,109)] h-[24px] bg-[rgb(245,166,109)]"
                  type="text"
                  name="nomeForn"
                ></textarea>
              </div>

              <div className="vt323-regular flex w-[100%] justify-between">
                <div className="flex flex-col">
                  <label htmlFor="telefoneForn" className="max-h-6 w-[100%]">
                    Telefone
                  </label>
                  <textarea
                    className="resize-none w-[50%] mx-4 px-2 break-words border-[rgb(245,148,87)] h-6 bg-[rgb(245,148,87)]"
                    type="text"
                    name="telefoneForn"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="emailForn" className="max-h-6 w-[100%]">
                    Email
                  </label>
                  <textarea
                    className="resize-none w-[50%] mx-4 px-2 break-words border-[rgb(245,148,87)] h-6 bg-[rgb(245,148,87)]"
                    type="text"
                    name="emailForn"
                  ></textarea>
                </div>
              </div>

              <div className="vt323-regular justify-between flex">
                <div className="flex flex-col w-20">
                  <label htmlFor="logradouroForn" className="max-h-12 mr-2 w-[60%]">
                    Logradouro
                  </label>
                  <input
                    pattern="\d{5}-\d{3}"
                    maxLength="9"
                    className="resize-none w-[100%] px-2 break-words border-[rgb(245,148,87)] h-6 bg-[rgb(245,148,87)]"
                    type="text"
                    name="logradouroForn"
                  />
                </div>

                <div className="flex flex-col justify-between flex-wrap">
                  <label htmlFor="contatoForn" className="max-h-6 mx-1 w-[100%]">
                    Endereço
                  </label>
                  <div className="flex w-48">
                    <textarea
                      className="resize-none w-[85%] mx-1 px-2 break-words border-[rgb(245,148,87)] h-6 bg-[rgb(245,148,87)]"
                      type="text"
                      name="contatoForn"
                    ></textarea>
                    <p className="w-12">, N°</p>
                    <input
                      pattern="\d{4}"
                      maxLength="4"
                      className="resize-none w-[40px] ml-2 px-2 break-words border-[rgb(245,148,87)] h-6 bg-[rgb(245,148,87)]"
                      type="text"
                      name="contatoForn"
                     
                    />
                  </div>
                
                 
  
              
            </div> 
            
          </div>
          
        </div> */}
      </section>
    </div>
    </MainPage>
  );
};

export default BuyAndSell