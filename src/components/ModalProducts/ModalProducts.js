import React from 'react'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import 'react-tippy/dist/tippy.css'
import './ModalProduct.css' 
import api from '../../services/api'


function ModalProducts(props) {
    const [modal, setIsModal] = useState(1);
    const [editProd, setEditProd] = useState({
      product_name: '',
      product_stock: '',
      product_stock_min: '',
      prod_cost_value: '',
      prod_sell_value: '',
      product_perishable: '',
      expiration_date: ''
    })

    const { productInfo } = props
    console.log('productInfor',productInfo);
    
    const inputmodal = 'p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded poppins-medium my-1 transition-all duration-[100ms] ease-in-out alt-color-5'
    const inputmodaledit = 'w-full p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded poppins-medium my-1 transition-all duration-[100ms] ease-in-out alt-color-5'
    const editarProd = async ()=>{
      const prod_nome = document.getElementById('prod_nome').value
      const edit_stock = document.getElementById('edit_stock').value
      const edit_stock_min = document.getElementById('edit_stock_min').value
      const edit_cost_value = document.getElementById('edit_cost_value').value
      const edit_sell_value = document.getElementById('edit_sell_value').value
      const edit_perishable = document.getElementById('edit_perishable').checked
      const edit_expiration_date = document.getElementById('edit_expiration_date').value
      
      setEditProd({
        product_name: prod_nome,
        product_stock: edit_stock,
        product_stock_min: edit_stock_min,
        prod_cost_value: edit_cost_value,
        prod_sell_value: edit_sell_value,
        product_perishable: edit_perishable,
        expiration_date: edit_expiration_date
      })

      try {
        const result = await api.put(`/products/${productInfo.product_id}`, editProd)
        console.log(result)
      }
      catch (error) {
        console.log(error)
      }
    }
    const editModal = () => {
      setIsModal(0)
    }
    const buyModal = () => {
      setIsModal(2)
    }
    const sellModal = () => {
      setIsModal(3)
    }
    const [quantity, setQuantity] = useState(0);
    const [validade, setExpiration] = useState("");
    const [buyorsell, setBuyorSell] = useState("");
    function palmeirasFlamengo(){
      buyModal()
      setBuyorSell("buy")
    };
    function flamengoPalmeiras(){
      sellModal()
      setBuyorSell("sell")
    }
    const prodId2= productInfo.product_id //id produto
    const vendaOuCompra={quantity,validade}

    const handleSubmit1=async(e)=>{
      e.preventDefault()
      console.log("OLA")
      try {
        const response = await api.post(`/buyandsell/${buyorsell}/${prodId2}`,vendaOuCompra)
      console.log(response)}catch(err){console.log(err)}
      console.log("info:",buyorsell,prodId2,vendaOuCompra)
      console.log("Oi")
      // window.location.reload()
    }

    const handleSubmit2=async(e)=>{
      e.preventDefault()
      console.log("OLA")
      try {
        const response = await api.post(`/buyandsell/${buyorsell}/${prodId2}`,vendaOuCompra)
      console.log(response)}catch(err){console.log(err)}
      console.log("info:",buyorsell,prodId2,vendaOuCompra)
      console.log("Oi")
      // window.location.reload()
    }

    if (modal == 1){
      return (
    
        <div className='flex w-full flex-wrap   ' >
         
        <div className='flex mx-auto   w-32 h-32 sm:w-38 sm:h-38'>
        <p className='cursor-pointer text-[#6B3710] absolute  right-4 top-4 rounded-full flex w-8 h-8 text-center align-middle bg-[#6B3710]' style={{ color: "var(--tertiary-color)" }} ><i onClick={editModal} className="fa-solid m-auto  fa-pencil"></i></p>
          <img src={productInfo.product_img || '../../images/default.png'} alt={'image do produto:' + productInfo.product_name} className={`   ${productInfo.product_img===null?'rounded-full':' rounded-full border-[0.25rem] border-[#D87B26]'} text-start  bg-[#3E1900]   m-auto object-fill `} />
          
        </div>
        <div className='w-full mt-10 sm:mt-0  '>
          
         
          
          
          <div>
          <p> Estoque : </p>
          <p className={inputmodal}>{productInfo.product_stock} Un.</p>
          <p> Estoque Mínimo : </p>
          <p className={inputmodal}>{productInfo.product_stock_min} Un.</p>
          <p> Valor de custo : </p>
          <p className={inputmodal}>R$ {productInfo.prod_cost_value}</p>
          <p> Valor de venda : </p>
          <p className={inputmodal}> R$ {productInfo.prod_sell_value}</p>
          </div>
          <div>
            <h1 className='text-xl my-2'>Lotes:</h1>
            <div className='mt-4 flex grid grid-cols-5 bg-[#6B3710] text-white'>
              <p className='col-span-1 text-center'>Id</p>
              <p className='col-span-2 text-center'>Validade</p>
              <p className='col-span-2 text-center'>Quantidade</p>
            </div>
            <div  className='flex py-[2px] flex-col'>
            {productInfo.batches ? productInfo.batches.map((batch,index) => {
                
                return (
                  <div key={batch.batch_id} className={`py-2 w-full flex grid grid-cols-5 ${index % 2 === 0 ? "bg-[#F5A66D]" : "bg-[#EA9457]"}`}>
                  <p className='col-span-1 text-center'>{batch.batch_id}</p>
                  <p className='col-span-2 text-center'>{batch.expiration_date}</p>
                  <p className='col-span-2 text-center'>{batch.quantity}</p>
                </div>
                )
                
              }): <Loading/>}
            
            </div>
          </div>
          <div  className='flex py-[2px] flex-col'>
          <h1 className='text-xl my-2'>Fornecedores:</h1>
            <div className=' flex grid grid-cols-6 bg-[#6B3710] text-white'>
              <p className='col-span-2 text-center'>Nome</p>
              <p className='col-span-2 text-center'>Contato</p>
              <p className='col-span-2 text-center'>Endereço</p>
            </div>
            <div>
            
            <div key={productInfo.supplier.supplier_id} className={`py-2 bg-[#F5A66D] w-full flex grid grid-cols-6 `}>
              <p className='col-span-2 text-center'>{productInfo.supplier.supplier_name}</p>
              <p className='col-span-2 text-center'>{productInfo.supplier.contact_info}</p>
              <p className='col-span-2 text-center'>{productInfo.supplier.address}</p>
            </div>
                
            
            
            </div>
    
    
          
          
          <p className='mt-2'> É perecível :</p>
          <p className={inputmodal}>{productInfo.product_perishable ? 'Sim' : 'Não'}</p>
          <div className='my-4 flex justify-center '>
          <a onClick={palmeirasFlamengo} className="bg-[#30551A] cursor-pointer mx-1 px-3 py-2 text-white rounded-md" >Comprar</a>
          <a onClick={flamengoPalmeiras} className="bg-[#8B2121]  cursor-pointer mx-1 px-3 py-2 text-white rounded-md">Vender</a>
          </div>
      </div>
      </div>
    
        
    </div>
      )
    }
    // else if (modal == 0){
    //   return (
    
    //     <div className='flex w-full flex-wrap   ' >
         
    //     <div className='flex mx-auto   w-32 h-32 sm:w-38 sm:h-38'>
    //       <img src={productInfo.product_img || '../../images/default.png'} alt={'image do produto:' + productInfo.product_name} className={`   ${productInfo.product_img===null?'rounded-full':' rounded-full border-[0.25rem] border-[#D87B26]'} text-start  bg-[#3E1900]   m-auto object-fill `} />
          
    //     </div>
        
          
         
          
          
    //       <div>
    //       <p> Nome : </p>
    //       <input id='prod_nome' className={inputmodaledit } placeholder={'Un.'}/>
    //       <p> Estoque : </p>
    //       <input id='edit_stock' className={inputmodaledit } placeholder={'Un.'}/>

    //       <p> Estoque Mínimo : </p>
    //       <input id='edit_stock_min' className={inputmodaledit} placeholder={'Un.'}/>
    //       <p> Valor de custo : </p>
    //       <input id='edit_cost_value' className={inputmodaledit} placeholder={'R$'}/>
    //       <p> Valor de venda : </p>
    //       <input id='edit_sell_value' className={inputmodaledit} placeholder={'R$'}/>
    //       <p> Quantidade máxima por lote : </p>
    //       <input id='edit_sell_value' className={inputmodaledit} placeholder={'R$'}/>
    //       </div>
          
         
    
    
          
          
          
    //       <div className="form-control my-1">
    //       <label className={inputmodaledit + "cursor-pointer label"}>
    //         <span className=" text-[#6B3710] ">É perecível</span>
    //         <input
    //           id='edit_perishable'
    //           type="checkbox"
    //           className="toggle toggle-primary"
            
      
    //         />
    //       </label>
    //     </div>

    //     <div className="form-control mb-4">
    //       <label className="label">
    //         <span className="label-text  text-[#6B3710]">Data de Validade</span>
    //       </label>
    //       <input
    //         id='edit_expiration_date'
    //         type="date"
    //         className={inputmodaledit + "cursor-pointer label"}
    //         name="expiration_date"
            
    //       />
    //     </div>

    //         <div className='my-4 flex justify-center '>
            
    //             <div className="modal-action pb-2 ">
    //               <label htmlFor={props.modalName} className="px-5 py-1 quinteral-color-bg rounded poppins align-middle my-auto shadow-md hvr-grow alt-color-5-bg tertiary-color cursor-pointer" onClick={props.closeModal}>Cancelar</label>
    //               <button type="submit" className="px-5 py-1 quarternary-color-bg rounded  poppins align-middle my-auto shadow-md hvr-grow alt-color-5">Salvar</button>
    //             </div>
    //         </div>
          
      
    
        
    // </div>
    //   )
    // }
    else if (modal == 2 ){
      return (
      <div>
        <div className='flex w-full flex-wrap  flex-col' >
          <h1>Registro de Compra</h1>
          <p> Quantidade : </p>
          <input id='qtdbuy' className={inputmodaledit } placeholder={'Un.'} onChange={(e) => {setQuantity(e.target.value)}}/>
              {productInfo.is_perishable ?<><p> Validade : </p><input id='expiração' className={inputmodaledit } type='date' onChange={(e) => {setExpiration(e.target.value)}} /></> : <></>}
              <div className="modal-action pb-2 ml-auto text-end align-end text-end justify-end">
                <label htmlFor={props.modalName} className="px-5 py-1 quinteral-color-bg rounded poppins align-middle my-auto shadow-md hvr-grow alt-color-5-bg tertiary-color cursor-pointer" onClick={props.closeModal}>Cancelar</label>
                <button type="submit" onClick={handleSubmit1} className="px-5 py-1 quarternary-color-bg rounded  poppins align-middle my-autoshadow-md hvr-grow alt-color-5">Finalizar</button>
                 
              </div>
      </div>
      </div>
      )
      
    }
    else if (modal == 3 ){

      return (
      <div>
        <div className='flex w-full flex-wrap  flex' >
          <h1>Registro de Venda</h1>
          <p> Quantidade : </p>
          <input id='qtd' className={inputmodaledit } placeholder={'Un.'} onChange={(e) => {setQuantity(e.target.value)}}/>
           <div className="modal-action pb-2 ml-auto text-end align-end text-end justify-end">
                  <label htmlFor={props.modalName} className="px-5 py-1 quinteral-color-bg rounded poppins align-middle my-auto shadow-md hvr-grow alt-color-5-bg tertiary-color cursor-pointer" onClick={props.closeModal}>Cancelar</label>
                  <button type="submit" onClick={handleSubmit2} className="px-5 py-1 quarternary-color-bg rounded  poppins align-middle my-autoshadow-md hvr-grow alt-color-5">Finalizar</button>
                </div>
      </div>
      </div>
      )
    }

  };
export default ModalProducts