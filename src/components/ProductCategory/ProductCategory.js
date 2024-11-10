import { useEffect, useState } from 'react'
import './ProductCategory.module.css'
import styles from './ProductCategory.module.css'
import api from '../../services/api'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'
import ShortModal from '../ShortModal/ShortModal'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import FlashMessage from '../../components/FlashMessage/FlashMessage'


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

    /**
     * Abre e fecha o modal de produtos
     */
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
      setProductName('')
      setProductDescription('')
      setProductUnitId('')
      setProductSupplierId('')
      setIsPerishable(false)
      setProductSellValue('')
      setProductCostValue('')
      setProductSectorId('')
      setProductLocalId('')
      setProductBrand('')
      setProductModel('')
      setProductImage(null)
      setProductStock('')
      setProductStockMin('')
      setQuantityMax('')
      setIsModalOpen(false)
    }

    /**
     * Registra o produto
     */
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState(null)
    const [productUnitId, setProductUnitId] = useState('')
    const [productSupplierId, setProductSupplierId] = useState('')
    const [isPerishable, setIsPerishable] = useState(false)
    const [productBrand, setProductBrand] = useState('')
    const [productModel, setProductModel] = useState('')
    const [productCostValue, setProductCostValue] = useState(0)
    const [productSellValue, setProductSellValue] = useState(0)
    const [productLocalId, setProductLocalId] = useState('')
    const [productSectorId, setProductSectorId] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [productImage, setProductImage] = useState(null)
	  const [imagePreview, setImagePreview] = useState(null)
    const [productStock, setProductStock] = useState(null)
    const [productStockMin, setProductStockMin] = useState(null)
    const [quantityMax, setQuantityMax] = useState(null)

    const handleSubmit = async(e) => {
      e.preventDefault()

      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('description', productDescription);
      formData.append('category_id', props.categoryKey);
      formData.append('supplier_id', productSupplierId);
      formData.append('is_perishable', isPerishable);
      formData.append('unit_id', productUnitId);
      formData.append('prod_model', productModel);
      formData.append('prod_brand', productBrand);
      formData.append('prod_cost_value', productCostValue);
      formData.append('prod_sell_value', productSellValue);
      formData.append('local_id', productLocalId);
      formData.append('sector_id', productSectorId);
      formData.append('product_stock', productStock);
      formData.append('product_stock_min', productStockMin);
      formData.append('quantity_max', quantityMax);
      console.log(formData.data)
      if (productImage) {
          formData.append('product_img', productImage);
      }
  
      try {
          await api.post("/products", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then(response => props.onProductAdded(response.data))
  
          setProductName('')
          setProductDescription('')
          setProductUnitId('')
          setProductSupplierId('')
          setIsPerishable(false)
          setProductSellValue('')
          setProductCostValue('')
          setProductSectorId('')
          setProductLocalId('')
          setProductBrand('')
          setProductModel('')
          setProductImage(null)
          setProductStock('')
          setProductStockMin('')
          setQuantityMax('')
          closeModal()
          flashSuccess()
      } catch (err) {
          console.log(err)
          flashError()
      }
    }

    useEffect(() => {
      if (productImage instanceof File) {
          const previewUrl = URL.createObjectURL(productImage)
          setImagePreview(previewUrl)
          return () => URL.revokeObjectURL(previewUrl)
      } else if (typeof productImage === 'string') {
          setImagePreview(productImage)
      } else {
          setImagePreview(null)
      }
    }, [productImage])
  

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
  const [tooltipKey, setTooltipKey] = useState(0)

  const openProdEditModal = (product) => {
    setCurrentProduct(product)
    setProductName(product.product_name)
    setProductUnitId(product.unit_id)
    setProductSupplierId(product.supplier_id)
    setProductLocalId(product.supplier_id)
    setProductSectorId(product.supplier_id)
    setIsPerishable(product.is_perishable)
    setProductCostValue(product.prod_cost_value) 
    setProductSellValue(product.prod_sell_value)
    setProductStock(product.product_stock)
    setProductStockMin(product.product_stock_min)
    setQuantityMax(product.quantity_max)


    const imageUrl = `http://localhost:3001${product.product_img}`
    setProductImage(imageUrl)
    setImagePreview(imageUrl)

    if (product.description === null) {
      setProductDescription('')
    }

    setIsProdEditModalOpen(true)
  }

  const closeProdEditModal = () => {
    setIsProdEditModalOpen(false)
    setCurrentProduct(null)
  }

  const handleProdUpdate = async (e) => {
    e.preventDefault()

    const updatedProductData = new FormData()
    updatedProductData.append('product_name', productName)
    updatedProductData.append('description', productDescription)
    updatedProductData.append('category_id', props.categoryKey)
    updatedProductData.append('supplier_id', productSupplierId)
    updatedProductData.append('is_perishable', isPerishable)
    updatedProductData.append('unit_id', productUnitId)
    updatedProductData.append('prod_model', productModel)
    updatedProductData.append('prod_brand', productBrand)
    updatedProductData.append('prod_cost_value', productCostValue)
    updatedProductData.append('prod_sell_value', productSellValue)
    updatedProductData.append('local_id', productLocalId)
    updatedProductData.append('sector_id', productSectorId)
    updatedProductData.append('product_stock', productStock)
    updatedProductData.append('product_stock_min', productStockMin)
    updatedProductData.append('quantity_max', quantityMax)

    if (productImage instanceof File) {
        updatedProductData.append('product_img', productImage)
    }

    try {
        await api
            .put(`/products/${currentProduct.product_id}`, updatedProductData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
              setTooltipKey((prevKey) => prevKey + 1)
              props.onProductUpdated(currentProduct.product_id, response.data)
              flashInfo()
              closeProdEditModal()
            });
    } catch (err) {
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

  const handleClickShow = () => {
    setShowCategoryProducts(!showCategoryProducts)
  }

  /**
   * Edição da categoria
   */
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const openCategoryModal = (category) => {
    setCategoryName(category.category_name)

    const imageUrl = `http://localhost:3001${category.category_image}`
    setCategoryImage(imageUrl)
    setImagePreview(imageUrl)

    setIsCategoryModalOpen(true)
  }
  const closeCategoryModal = () => {
    setCategoryImage(null)
    setCategoryName('')
    setIsCategoryModalOpen(false)
  }

  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(null)

  const handleCategoryUpdate = async(e) => {
      e.preventDefault()

      const formData = new FormData();
      formData.append('category_name', categoryName)
      formData.append('category_image', categoryImage)

      try {
          await api
          .put(`/category/${props.categoryKey}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => console.log(response))
          
          props.onCategoryUpdated(props.categoryKey, categoryName, categoryImage)

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
    if (jsonUser.role === "admin"){
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
    <div className='w-full  rounded bg-[#5F2E09]  shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] mt-4'>
        <div className=' p-4 mx-4 h-[100px] overflow-y-auto flex flex-wrap relative'>
          <div className={` p-4 transition-opacity duration-200 max-h-[100px] absolute inset-0 bg-[#5F2E09]  z-30 flex justify-between  items-center justify-center ${!showCategoryProducts ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <figure className='w-[5rem] h-[5rem] rounded-full alt-color-4-bg border-4 border-[#D87B26] shadow-[inset_-2px_3px_2px_4px_rgba(0,0,0,0.2)]'>
            {props.categoryImage ? (
              <img
                src={`http://localhost:3001${props.categoryImage}`}
                alt={props.categoryName}
                className='w-full h-full object-cover rounded-full'
              />
            ) : null}
          </figure>
            <p className='my-2 poppins-semibold text-[#EFBB7F] text-[24px]'>{ props.categoryName }</p>
            <div className='flex justify-evenly bg-[#EFBB7F] rounded-md w-[10%]'>
              <p className='cursor-pointer' onClick={handleClickShow}>
                <i class="fa-solid fa-eye"></i>
              </p>
              <p className='cursor-pointer' onClick={() => handleCategoryDelete(props.categoryKey)}>
                <i class="fa-solid fa-trash"></i>
              </p>
              <p className='cursor-pointer' onClick={() => openCategoryModal(props.category)}>
                <i class="fa-solid fa-pencil"></i>
              </p>
            </div>
          </div>
            {/*
              Aqui ocorre a criação de cada quadrado, é obtido uma lista com todos os produtos
              que são mapeados, cada produto irá gerar um quadrado e cada quadrado terá sua tooltip           
            */}
            {props.products.map((product, index) => {
              const unit = units.find((u) => u.unit_id === product.unit_id)?.unit_type || 'N/A'
              return (
                <Tooltip
                key={`${product.product_id}-${tooltipKey}`}
                html={(
                  <div className={styles.myTippyTheme}>
                    <strong>Nome:</strong> {product.product_name}<br />
                    <strong>Unidade:</strong> {unit}<br />
                    <strong>Perecível:</strong> {product.is_perishable ? 'Sim' : 'Não'}
                  </div>
                )}
                title={product.product_name}
                arrow={true}
                theme='dark'
                delay={20}
                trigger='mouseenter'
              >
                <div key={index} className={`relative w-12 h-12 mb-4 bg-transparent border-l-[3px] border-b-[3px] border-[#FFE4A1] cursor-pointer ${styles.borderDepth}`} id={product.product_id} onMouseEnter={() => setHoveredProductId(product.product_id)}
                onMouseLeave={() => setHoveredProductId(null)}
                onClick={() => openProdEditModal(product)}
                >
                {hoveredProductId === product.product_id && (
                  <i 
                    className="fa-solid fa-trash absolute top-[-10px] right-[-5px] text-red-500 cursor-pointer" 
                    onClick={() => handleDelete(product.product_id)}
                  ></i>
                )}
                </div>
              </Tooltip>
              )
            })}

            {/* Botão para adicionar novo produto */}
            <button
                onClick={openModal}
                className="w-12 h-12 alt-color-4-bg border-[3px] border-[#D87B26] flex items-center justify-center text-2xl"
            >
            <i class="fa-solid fa-plus"></i>
            </button>
        </div>

            

    {/* Modal de produto */}
		{isModalOpen && (
			<Modal closeModal={closeModal} title="Adicionar novo produto" handleSubmit={handleSubmit}>
				<div className='flex justify-between'>
					<div className='w-[20%]'>
						<div
							className="bg-[#FFC376] p-[1rem] h-[14rem] w-[14rem] flex items-center justify-center border-8 border-[#D87B26] cursor-pointer mt-4 shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] shadow-[inset_-2px_5px_2px_2px_rgba(0,0,0,0.25)] relative"
							onClick={() => document.getElementById('product-image-input').click()}
						>
							<input
								type="file"
								id="product-image-input"
								className="hidden"
								onChange={(e) => {
									setProductImage(e.target.files[0]);
								}}
								name="product-image"
							/>
							<i className="fa-solid fa-plus text-5xl cursor-pointer alt-color-5"></i>

							{imagePreview && (
								<div className="mt-4">
									<img src={imagePreview} alt="preview da imagem" className="w-full h-full z-0 absolute object-cover inset-0" />
								</div>
							)}
						</div>
					</div>

					<div className='w-[38%]'>
						<input type="hidden" value={props.categoryKey} />

						<div className="form-control mb-4 w-full">
							<label className="label">
							<span className="label-text alt-color-5">Nome do produto</span>
							</label>
							<input
							type="text"
							placeholder="Digite o nome do produto"
							className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
							required
							name='product_name'
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
							/>
						</div>

						<div className="form-control mb-4">
							<label className="label">
							<span className="label-text alt-color-5">Unidade</span>
							</label>
							<select
							value={productUnitId}
							onChange={(e) => setProductUnitId(parseInt(e.target.value))}
							className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
							>
							<option disabled value="">Selecionar unidade</option>
							{units.map((unit) => (
								<option key={unit.unit_id} value={unit.unit_id}>{unit.unit_type}</option>
							))}
							</select>
						</div>

						<div className="form-control mb-4">
							<label className="label">
							<span className="label-text alt-color-5">Fornecedor</span>
							</label>
							<select
							value={productSupplierId}
							onChange={(e) => setProductSupplierId(parseInt(e.target.value))}
							className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
							>
							<option disabled value="">Selecionar fornecedor</option>
							{suppliers.map((supplier) => (
								<option key={supplier.supplier_id} value={supplier.supplier_id}>{supplier.supplier_name}</option>
							))}
							</select>
						</div>

						<div className='flex justify-between'>
							<div className="form-control mb-4">
								<label className="label">
								<span className="label-text alt-color-5">Preço de Custo</span>
								</label>
								<input
								type="number"
								placeholder="Digite o preço de custo"
								className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
								required
								name='cost_price'
								value={productCostValue}
								onChange={(e) => setProductCostValue(parseFloat(e.target.value) || 0)} 
								/>
							</div>

							<div className="form-control mb-4">
								<label className="label">
								<span className="label-text alt-color-5">Preço de Venda</span>
								</label>
								<input
								type="number"
								placeholder="Digite o preço de venda"
								className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
								required
								name='sell_price'
								value={productSellValue}
								onChange={(e) => setProductSellValue(parseFloat(e.target.value) || 0)} 
								/>
							</div>
						</div>

						<div className="form-control mb-4 w-full">
							<label className="cursor-pointer label">
							<span className="label-text alt-color-5">É perecível</span>
							<input
								type="checkbox"
								className="toggle toggle-primary bg-[#F8B971] checked:bg-[#B45105] checked:border-[#F8B971] rounded-[5px]"
								checked={isPerishable}
								onChange={(e) => setIsPerishable(e.target.checked)}
							/>
							</label>
						</div>

						{isPerishable && (
							<div className="form-control mb-4">
								<label className="label">
								<span className="label-text alt-color-5">Data de Validade</span>
								</label>
								<input
								type="date"
								className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
								name="expiration_date"
								value={expirationDate}
								onChange={(e) => setExpirationDate(e.target.value)}
								/>
							</div>
						)}
					</div>

					<div className='w-[38%]'>
						<div className="form-control mb-4">
							<label className="label">
							<span className="label-text alt-color-5">Local</span>
							</label>
							<select
							value={productLocalId}
							onChange={(e) => setProductLocalId(parseInt(e.target.value))}
							className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
							>
							<option disabled value="">Selecionar local</option>
							{local.map((local) => (
								<option key={local.local_id} value={local.local_id}>{local.local_name}</option>
							))}
							</select>
						</div>

						<div className="form-control mb-4">
							<label className="label">
							<span className="label-text alt-color-5">Setor</span>
							</label>
							<select
							value={productSectorId}
							onChange={(e) => setProductSectorId(parseInt(e.target.value))}
							className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
							>
							<option disabled value="">Selecionar setor</option>
							{sectors.map((sector) => (
								<option key={sector.sector_id} value={sector.sector_id}>{sector.sector_name}</option>
							))}
							</select>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text alt-color-5">Estoque</span>
							</label>
							<div className='flex justify-between'>
								<input
									type="text"
									className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
									name="expiration_date"
									value={productStockMin}
									placeholder='Mínimo'
									onChange={(e) => setProductStockMin(e.target.value)}
								/>
								<input
									type="text"
									className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
									name="expiration_date"
									value={productStock}
									placeholder='Atual'
									onChange={(e) => setProductStock(e.target.value)}
								/>
								<input
									type="text"
									className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
									name="expiration_date"
									value={quantityMax}
									placeholder='Máximo'
									onChange={(e) => setQuantityMax(e.target.value)}
								/>
							</div>

							<div className="form-control mb-4 mt-4 w-full">
								<label className="label ">
								<span className="label-text alt-color-5">Descrição (Opcional)</span>
								</label>
								<textarea
								placeholder="Digite a descrição do produto"
								className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 placeholder-color"
								name='description'
								value={productDescription}
								onChange={(e) => setProductDescription(e.target.value)}
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)}

      {/* Modal para editar produto */}
      {isProdEditModalOpen && (
        <Modal closeModal={closeProdEditModal} title="Editar Produto" handleSubmit={handleProdUpdate}>
            <div className='flex justify-between'>
              <div className='w-[20%]'>
                <div
                  className="bg-[#FFC376] p-[1rem] h-[14rem] w-[14rem] flex items-center justify-center border-8 border-[#D87B26] cursor-pointer mt-4 shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] shadow-[inset_-2px_5px_2px_2px_rgba(0,0,0,0.25)] relative"
                  onClick={() => document.getElementById('product-image-input').click()}
                >
                  <input
                    type="file"
                    id="product-image-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        setProductImage(file)
                        setImagePreview(URL.createObjectURL(file))
                      }
                    }}
                    name="product-image"
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview da imagem" className="w-full h-full z-0 absolute object-cover inset-0" />
                  ) : (
                    <i className="fa-solid fa-plus text-5xl cursor-pointer alt-color-5"></i>
                  )}
                </div>
              </div>

              <div className='w-[38%]'>
                <input type="hidden" value={props.categoryKey} />

                <div className="form-control mb-4 w-full">
                  <label className="label">
                  <span className="label-text alt-color-5">Nome do produto</span>
                  </label>
                  <input
                  type="text"
                  placeholder="Digite o nome do produto"
                  className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                  required
                  name='product_name'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                  <span className="label-text alt-color-5">Unidade</span>
                  </label>
                  <select
                  value={productUnitId}
                  onChange={(e) => setProductUnitId(parseInt(e.target.value))}
                  className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                  >
                  <option disabled value="">Selecionar unidade</option>
                  {units.map((unit) => (
                    <option key={unit.unit_id} value={unit.unit_id}>{unit.unit_type}</option>
                  ))}
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                  <span className="label-text alt-color-5">Fornecedor</span>
                  </label>
                  <select
                  value={productSupplierId}
                  onChange={(e) => setProductSupplierId(parseInt(e.target.value))}
                  className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                  >
                  <option disabled value="">Selecionar fornecedor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.supplier_id} value={supplier.supplier_id}>{supplier.supplier_name}</option>
                  ))}
                  </select>
                </div>

                <div className='flex justify-between'>
                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text alt-color-5">Preço de Custo</span>
                    </label>
                    <input
                    type="number"
                    placeholder="Digite o preço de custo"
                    className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                    required
                    name='cost_price'
                    value={productCostValue}
                    onChange={(e) => setProductCostValue(parseFloat(e.target.value) || 0)} 
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text alt-color-5">Preço de Venda</span>
                    </label>
                    <input
                    type="number"
                    placeholder="Digite o preço de venda"
                    className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                    required
                    name='sell_price'
                    value={productSellValue}
                    onChange={(e) => setProductSellValue(parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                </div>

                <div className="form-control mb-4 w-full">
                  <label className="cursor-pointer label">
                  <span className="label-text alt-color-5">É perecível</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary bg-[#F8B971] checked:bg-[#B45105] checked:border-[#F8B971] rounded-[5px]"
                    checked={isPerishable}
                    onChange={(e) => setIsPerishable(e.target.checked)}
                  />
                  </label>
                </div>

                {isPerishable && (
                  <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text alt-color-5">Data de Validade</span>
                    </label>
                    <input
                    type="date"
                    className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                    name="expiration_date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className='w-[38%]'>
                <div className="form-control mb-4">
                  <label className="label">
                  <span className="label-text alt-color-5">Local</span>
                  </label>
                  <select
                  value={productLocalId}
                  onChange={(e) => setProductLocalId(parseInt(e.target.value))}
                  className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                  >
                  <option disabled value="">Selecionar local</option>
                  {local.map((local) => (
                    <option key={local.local_id} value={local.local_id}>{local.local_name}</option>
                  ))}
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                  <span className="label-text alt-color-5">Setor</span>
                  </label>
                  <select
                  value={productSectorId}
                  onChange={(e) => setProductSectorId(parseInt(e.target.value))}
                  className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5"
                  >
                  <option disabled value="">Selecionar setor</option>
                  {sectors.map((sector) => (
                    <option key={sector.sector_id} value={sector.sector_id}>{sector.sector_name}</option>
                  ))}
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text alt-color-5">Estoque</span>
                  </label>
                  <div className='flex justify-between'>
                    <input
                      type="text"
                      className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
                      name="expiration_date"
                      value={productStockMin}
                      placeholder='Mínimo'
                      onChange={(e) => setProductStockMin(e.target.value)}
                    />
                    <input
                      type="text"
                      className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
                      name="expiration_date"
                      value={productStock}
                      placeholder='Atual'
                      onChange={(e) => setProductStock(e.target.value)}
                    />
                    <input
                      type="text"
                      className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 w-[30%] placeholder-color"
                      name="expiration_date"
                      value={quantityMax}
                      placeholder='Máximo'
                      onChange={(e) => setQuantityMax(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4 mt-4 w-full">
                    <label className="label ">
                    <span className="label-text alt-color-5">Descrição (Opcional)</span>
                    </label>
                    <textarea
                    placeholder="Digite a descrição do produto"
                    className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5 placeholder-color"
                    name='description'
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}

      {/* Modal de edição de categoria */}
      {isCategoryModalOpen && (
        <ShortModal
            title="Editar categoria"
            handleSubmit={handleCategoryUpdate}
            modalName="editar-categoria"
            closeModal={closeCategoryModal}
        >
            <div className='w-full flex flex-col items-center mt-4 '>
              <label className='label'>Imagem da categoria</label>
              <div
                className="bg-[#FFC376] p-[1rem] h-[14rem] w-[14rem] flex items-center justify-center border-8 border-[#D87B26] cursor-pointer shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] shadow-[inset_-2px_5px_2px_2px_rgba(0,0,0,0.25)] relative"
                onClick={() => document.getElementById('category-image-input').click()}
              >
                <input
                  type="file"
                  id="category-image-input"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setCategoryImage(file)
                      setImagePreview(URL.createObjectURL(file))
                    }
                  }}
                  name="category-image"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="preview da imagem" className="w-full h-full z-0 absolute object-cover inset-0" />
                ) : (
                  <i className="fa-solid fa-plus text-5xl cursor-pointer alt-color-5"></i>
                )}
              </div>
            </div>

            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text alt-color-5">Nome da categoria</span>
                </label>
                <input type="text" placeholder="Digite o nome da categoria" className="p-[4px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)] ring ring-2 ring-[#BF823C] focus:ring-[#3E1A00] outline-none quinteral-color-bg rounded font-pixel text-xl transition-all duration-[100ms] ease-in-out alt-color-5" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} name='category-name' />
            </div>
        </ShortModal>
      )}

      {/* Componente flash message, verifica se o estado flash é true e então renderiza a flash message */}
      {flash && (
          <FlashMessage
              message={flash.message}
              type={flash.type}
              duration={3000}
              onClose={() => setFlash(null)}
          />
      )}
    </div>
    )
}

export default ProductCategory