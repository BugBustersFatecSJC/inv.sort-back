import { useEffect, useState } from 'react'
import './ProductCategory.module.css'
import styles from './ProductCategory.module.css'
import api from '../../services/api'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import FlashMessage from '../FlashMessage/FlashMessage'
import { useNavigate } from 'react-router-dom'


/******************************************************************************
 * Componente que exibe o container da categoria com os produtos dentro       *
 *****************************************************************************/

function ProductCategory(props) {
  /**
   * Criação da renderização do componente de loading
   */
   const [loading, setLoading] = useState(true)

  /**
   * Criação dos quadrados dos produtos no inventário
   */
  const [products, setProducts] = useState([]) // Aqui, em vez de `squares`, use `products`
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data) // Armazena os produtos diretamente no estado
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
    /**
     * Renderização da flash message
     */
    const [flash, setFlash] = useState(null)

    const showFlashMessage = (message, type) => {
      setFlash(null)
      setTimeout(() => {
          setFlash({ message, type })
      }, 0)
    }

    const flashSuccess = () => {
      showFlashMessage('Item adicionado com sucesso!','success');
    }

    const flashError = () => {
      showFlashMessage('Um erro aconteceu','error');
    };

    const flashInfo = () => {
      showFlashMessage('Item atualizado', 'info');
    }

    const flashDelete = () => {
      showFlashMessage('Item deletado', 'success');
    }
    
    /**
     * Retorna todas as unidades
     */
    const [units, setUnits] = useState([])

    const fetchUnits = async () => {
      try {
        await api
          .get('/unit')
          .then(response => setUnits(response.data))
      } catch(err) {
          console.log(err)
      }
    }
    
    /**
     * Retorna todos os fornecedores
    */
   
   const [suppliers, setSuppliers] = useState([])
   
   const fetchSuppliers = async () => {
     try {
       await api
       .get('/supplier')
       .then(response => setSuppliers(response.data))
      } catch(err) {
        console.log(err)
      }
    }

    /**
     * Retorna todos os setores
    */
   
    const [sectors, setSector] = useState([])
      
    const fetchSector = async () => {
      try {
        await api
        .get('/sector')
        .then(response => setSector(response.data))
      } catch(err) {
        console.log(err)
      }
    }

 /**
     * Retorna todos os setores
    */
   
 const [batch, setBatch] = useState([])
      
 const fetchBatch = async () => {
   try {
     await api
     .get('/batch')
     .then(response => setBatch(response.data))
   } catch(err) {
     console.log(err)
   }
 }

    /**
     * Retorna todos os locais
    */
   
   const [local, setLocals] = useState([])
   
   const fetchLocals = async () => {
     try {
       await api
       .get('/local')
       .then(response => setLocals(response.data))
      } catch(err) {
        console.log(err)
      }
    }

    /**
     * Hook de useEffect para ativar as funções quando o componente é renderizado
     */
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        await fetchUnits()
        await fetchSuppliers()
        await fetchProducts()
        await fetchSector()
        await fetchLocals()
        await fetchBatch()

      }

      fetchData()
    }, [])
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })
    /**
     * Abre e fecha o modal de produtos
     */
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    /**
     * Abre e fecha o modal de categorias
     */
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

    const openCategoryModal = () => setIsCategoryModalOpen(true);
    const closeCategoryModal = () => setIsCategoryModalOpen(false);

    /**
     * Registra o produto
     */
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState(null)
    const [productUnitId, setProductUnitId] = useState('')
    const [productSupplierId, setProductSupplierId] = useState('')
    const [isPerishable, setIsPerishable] = useState(false)
    const [productBrand, setProductBrand] = useState('');
    const [productModel, setProductModel] = useState('');
    const [productCostValue, setProductCostValue] = useState(0);
    const [productSellValue, setProductSellValue] = useState(0);
    const [productLocalId, setProductLocalId] = useState('');
    const [productSectorId, setProductSectorId] = useState('');
   // const [productBatchId, setProductBatchId] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    

    const handleSubmit = async(e) => {
      e.preventDefault()

      const ProductData = {
          product_name: productName,
          description: productDescription,
          category_id: props.categoryKey,
          supplier_id: productSupplierId,
          is_perishable: isPerishable,
          unit_id: productUnitId,
          prod_model: productModel,
          prod_brand: productBrand,
          prod_cost_value: productCostValue,
          prod_sell_valleu: productSellValue,
          local_id: productLocalId,
          sector_id: productSectorId,
         // batch_id: productBatchId
      }

      try {
          await api
          .post("/products", ProductData)
          .then(response => props.onProductAdded(response.data))          

          setProductName('')
          setProductDescription('')
          setProductUnitId('')
          setProductSupplierId('')
          setIsPerishable(false)
          //setProductBatchId('') 
          setProductSellValue('')
          setProductCostValue('')
          setProductSectorId('')
          setProductLocalId('')
          setProductBrand('')
          setProductModel('')
          closeModal()
          flashSuccess()
      } catch (err) {
          console.log(err)
          flashError()
      }
  }

  /**
   * Deleta o produto
   */
  const handleDelete = async (product_id) => {
    const user = localStorage.getItem("user")
    const jsonUser = JSON.parse(user)
    
    if (jsonUser.role === "admin"){
    
    try {
      await api
        .delete(`/products/${product_id}`)
        .then((response) => {console.log(response)})
        props.onProductDeleted(product_id)
        flashDelete()
    } catch (err) {
      console.log(err)
      flashError()
    }
  }
  else {alert ("Você não tem permissão para fazer isso")}
  }

  /**
   * Edição do produto
   */
  const [isProdEditModalOpen, setIsProdEditModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)

  const openProdEditModal = (product) => {
    setCurrentProduct(product)
    setProductName(product.product_name)
    setProductDescription(product.description)
    setProductUnitId(product.unit_id)
    setProductSupplierId(product.supplier_id)
    setIsPerishable(product.is_perishable)
    setProductCostValue(product.prod_cost_value); 
    setProductSellValue(product.prod_sell_value); 

    setIsProdEditModalOpen(true)
  }

  const closeProdEditModal = () => {
    setIsProdEditModalOpen(false)
    setCurrentProduct(null)
  }

  const handleProdUpdate = async (e) => {
    e.preventDefault()

    const updatedProductData = {
      product_name: productName,
      description: productDescription,
      category_id: props.categoryKey,
      supplier_id: productSupplierId,
      is_perishable: isPerishable,
      unit_id: productUnitId,
      prod_cost_value: productCostValue,
      prod_sell_value: productSellValue
    }

    
    try {
      await api
        .put(`/products/${currentProduct.product_id}`, updatedProductData)
        .then(response => console.log(response))
        

        /******************************************************************************
         * ATEÇÃO                                                                     *
         * TODO: Aqui está ocorrendo um erro com o react tippy (que faz o tooltip)    *
         * e a atualização dinâmica do componente, o erro em questão é que            *
         * o react tippy não consegue carregar código jsx depois de atualizar         *
         * o produto, então como quebra galho após a atualizaçaõ do produto, a página *
         * é recarregada, para mostrar as alterações                                  * 
         * TAMBÉM ACONTECE AO EXCLUIR :(                                              *
         ******************************************************************************/
        // window.location.reload()
        // props.onProductUpdated(currentProduct.product_id, updatedProductData)

        closeProdEditModal()
        flashInfo()
    } catch(err) {
      console.log(err)
      flashError()
    }
  }

  
  /**
   * Hover de cada produto
   */
  const [hoveredProductId, setHoveredProductId] = useState(null)

  /**
   * Funcionalidade de abrir o container de categoria
   */
  const [showCategoryProducts, setShowCategoryProducts] = useState(false)
  const id = props.categoryKey
  const navigate = useNavigate()
  const handleClickShow = () => {
    navigate('/buyandsell/'+id)
  }


  /**
   * Edição da categoria
   */
  const [categoryName, setCategoryName] = useState('')

  const handleCategoryUpdate = async(e) => {
      e.preventDefault()

      const categoryData = {
          category_name: categoryName,
      }

      try {
          await api
          .put(`/category/${props.categoryKey}`, categoryData)
          .then(response => console.log(response))
          
          props.onCategoryUpdated(props.categoryKey, categoryName)
          setCategoryName('')

          closeCategoryModal()
          flashInfo()
      } catch (err) {
          console.log(err)
          flashError()
      }
  }

  /**
   * Deleta a categoria
   */
  const handleCategoryDelete = async (category_id) => {
    const user = localStorage.getItem("user")
    const jsonUser = JSON.parse(user)
    if ( jsonUser.role === "admin" || jsonUser.role === "gerente"  ){
    try {
      await api
        .delete(`/category/${category_id}`)
        .then((response) => {console.log(response)})

        props.onCategoryDeleted(category_id)
        
        flashDelete()
    } catch (err) {
      console.log(err)
      flashError()
    }
    }
    else {alert("Você não tem permissão para fazer isso")}
  }

    return (
      // Container da categoria


        <div className='w-[90%] my-2 mx-auto g  bg-[#5F2E09] rounded-md hover:bg-[#3E1900] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] mt-1 h-[200px]  mx-4 flex relative'>
          <div className={`  transition-opacity duration-200 rounded-md  w-full  bg-[#5F2E09] flex justify-center  items-center justify-center ${!showCategoryProducts ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col justify-center flex-wrap w-full  "> 
            <figure className='w-[3rem] mx-auto h-[3rem] rounded-full alt-color-4-bg border-4 border-[#D87B26] shadow-[inset_-2px_3px_2px_4px_rgba(0,0,0,0.2)]'>
              {props.categoryImage ? (
                <img
                  src={`http://localhost:3001${props.categoryImage}`}
                  alt={props.categoryName}
                  className='w-full h-full object-cover rounded-full'
                />
              ) : null}
            </figure>
            
            <div className="flex flex-col w-[100%] h-full text-ellipsis text-wrap text-center justify-center mx-auto ">
              
                <p className={`my-2  mx-auto px-1 poppins-semibold  ${windowWidth > 450?'text-[15px]  ':'text-[13px]'} w-full  text-center`} style={{ color: "var(--tertiary-color)" }}>
                  {props.categoryName}
                </p>
                
              
              <div className="flex justify-center rounded-md w-[100%] mt-4 mx-auto  poppins-medium mx-auto">
                <p className="cursor-pointer text-center mx-2 flex flex-col justify-center w-8" onClick={handleClickShow} style={{ color: "var(--tertiary-color)" }}>
                  <i className="fa-solid fa-eye"></i>
                  
                </p>
                <p className="cursor-pointer text-center mx-2 flex flex-col justify-center w-8" onClick={() => handleCategoryDelete(props.categoryKey)} style={{ color: "var(--tertiary-color)" }}>
                  <i className="fa-solid fa-trash"></i>
                  
                </p>
                <p className="cursor-pointer text-center mx-2 flex flex-col justify-center w-8" onClick={openProdEditModal} style={{ color: "var(--tertiary-color)" }}>
                  <i className="fa-solid fa-pencil"></i>
                  
                </p>
              </div>
            </div>


            </div>
     
        </div>

            

    </div>
    )
}

export default ProductCategory